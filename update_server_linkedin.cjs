const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const linkedInAuthRoute = `
  // LinkedIn OAuth
  app.get("/api/auth/linkedin/url", (req, res) => {
    // We expect the frontend to be running on the APP_URL
    // But since this is a proxy/iframe, we'll try to guess redirect_uri or rely on APP_URL
    const redirectUri = process.env.APP_URL ? \`\${process.env.APP_URL}/auth/callback\` : 'http://localhost:3000/auth/callback';
    
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.LINKEDIN_CLIENT_ID || 'dummy_client_id',
      redirect_uri: redirectUri,
      state: 'foobar',
      scope: 'openid profile email'
    });

    const authUrl = \`https://www.linkedin.com/oauth/v2/authorization?\${params.toString()}\`;
    res.json({ url: authUrl });
  });

  app.get(["/auth/callback", "/auth/callback/"], (req, res) => {
    // This is the OAuth callback from LinkedIn.
    // In a real app we'd exchange code for token here.
    res.send(\`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentication successful. This window should close automatically.</p>
        </body>
      </html>
    \`);
  });
`;

if (!code.includes('/api/auth/linkedin/url')) {
  code = code.replace('// Vite middleware for development', linkedInAuthRoute + '\n  // Vite middleware for development');
  fs.writeFileSync('server.ts', code);
  console.log('Added LinkedIn OAuth routes');
}

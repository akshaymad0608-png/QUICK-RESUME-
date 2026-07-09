const fs = require('fs');
let code = fs.readFileSync('src/firebase.ts', 'utf8');

if (!code.includes('setCustomParameters')) {
  code = code.replace(
    'export const googleProvider = new GoogleAuthProvider();',
    "export const googleProvider = new GoogleAuthProvider();\ngoogleProvider.setCustomParameters({ prompt: 'select_account' });"
  );
  fs.writeFileSync('src/firebase.ts', code);
  console.log('Fixed Google Provider');
}

import fs from 'fs';

let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const hookInsert = `
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };
`;

content = content.replace(/(export const Home = \(\{[\s\S]*?\}\) => \{)/, `$1\n${hookInsert}`);

const formReplacement = `
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Get weekly tips..."
                className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm flex-1 focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--text-subtle)] min-w-0"
              />
              <button type="submit" disabled={subscribed} className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-5 py-3 rounded-xl text-sm font-bold hover:bg-[var(--color-primary-light)] transition-colors whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed">
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
`;

content = content.replace(/<div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">[\s\S]*?<\/div>/, formReplacement);

fs.writeFileSync('src/components/Home.tsx', content);

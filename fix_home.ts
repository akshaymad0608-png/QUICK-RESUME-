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

content = content.replace(/(export const Home: React\.FC<HomeProps> = \(\{[\s\S]*?\}\) => \{)/, `$1\n${hookInsert}`);

fs.writeFileSync('src/components/Home.tsx', content);

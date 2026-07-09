const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

// Add import for LoginModal and useAuth
if (!code.includes('LoginModal')) {
  code = code.replace("import { Menu, X, Feather } from 'lucide-react';", "import { Menu, X, Feather, LogOut } from 'lucide-react';\nimport { LoginModal } from '../LoginModal';\nimport { auth } from '../../firebase';\nimport { onAuthStateChanged, signOut, User } from 'firebase/auth';\nimport { useEffect } from 'react';");
}

if (!code.includes('const [isLoginModalOpen')) {
  code = code.replace("const [mobileMenuOpen, setMobileMenuOpen] = useState(false);", "const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);\n  const [user, setUser] = useState<User | null>(null);\n\n  useEffect(() => {\n    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {\n      setUser(currentUser);\n    });\n    return () => unsubscribe();\n  }, []);\n\n  const handleLogout = () => {\n    signOut(auth);\n  };\n");
}

const loginButtonHtml = `
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-slate-300 text-sm font-medium">{user.displayName || 'User'}</span>
              <button 
                onClick={handleLogout}
                className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              className="text-white hover:text-indigo-400 font-medium text-sm transition-colors"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Log in
            </button>
          )}
          <button 
            className="bg-indigo-600 text-white border-none rounded-md px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors"
            onClick={() => navigate('/start')}
          >
            Create Resume
          </button>
`;

if (code.includes('<div className="hidden md:flex items-center gap-5">')) {
  code = code.replace(
    /<div className="hidden md:flex items-center gap-5">\s*<button[^>]+>\s*Create Resume\s*<\/button>\s*<\/div>/g, 
    `<div className="hidden md:flex items-center gap-5">
${loginButtonHtml}
        </div>`
  );
}

if (!code.includes('<LoginModal')) {
  code = code.replace("</header>", `
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onSuccess={() => {}} 
      />
    </header>`);
}

fs.writeFileSync('src/components/layout/Navbar.tsx', code);
console.log('Navbar updated!');

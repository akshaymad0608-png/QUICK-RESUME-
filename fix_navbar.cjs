const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

const replacement = `
        <div className="hidden md:flex items-center gap-5">
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
        </div>
`;

code = code.replace(/<div className="hidden md:flex items-center gap-5">[\s\S]*?<\/div>/, replacement);

fs.writeFileSync('src/components/layout/Navbar.tsx', code);

import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const hookInsert = `  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleInputText, setRoleInputText] = useState("");
`;
content = content.replace('const [showAIModal, setShowAIModal] = useState(false);', 'const [showAIModal, setShowAIModal] = useState(false);\n' + hookInsert);

const generateAICoverLetterMod = content.replace(/const generateAIResume = async \(\) => \{[\s\S]*?(?=const role = prompt\()/m, (match) => {
  return match.replace('const generateAIResume = async () => {', 'const generateAIResume = async (roleOverride?: string) => {');
});

content = generateAICoverLetterMod.replace(/const role = prompt\([\s\S]*?\);/, 'const role = roleOverride || roleInputText;\n    if (!role) return;');

// Wait, the "AI Generate Sample" button in App.tsx:
content = content.replace(/onClick=\{generateAIResume\}/g, 'onClick={() => setShowRoleModal(true)}');

// We must also pass setShowRoleModal to BuilderView maybe? No, BuilderView has its own AI Generate Sample button?
// Let's check if BuilderView has its own button. BuilderView.tsx has "AI Generate content"? No, it's just "Start by filling out your details".

const modalInsert = `
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[var(--color-bg-2)] p-6 rounded-2xl w-full max-w-lg border border-[var(--color-border-hover)] shadow-2xl">
            <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">
              What role are you targeting?
            </h2>
            <InputField
              label="Role / Title"
              value={roleInputText}
              onChange={(e: any) => setRoleInputText(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  generateAIResume();
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl transition-colors font-medium flex items-center gap-2"
              >
                <Sparkles size={16} /> Generate
              </button>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace('{/* AI Suggestion Modal */}', modalInsert + '{/* AI Suggestion Modal */}');

fs.writeFileSync('src/App.tsx', content);

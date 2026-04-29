import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace ATS Score state with debounce
if(!content.includes('clearTimeout(handler)')) {
  content = content.replace(
    'const [atsInfo, setAtsInfo] = useState(calculateATSScore(data));',
    'const [atsInfo, setAtsInfo] = useState(calculateATSScore(data));\n  useEffect(() => {\n    const handler = setTimeout(() => {\n      setAtsInfo(calculateATSScore(data));\n    }, 500);\n    return () => clearTimeout(handler);\n  }, [data]);'
  );

  // remove previous setAtsInfo from useEffect if any
  content = content.replace(/setAtsInfo\(calculateATSScore\(data\)\);/g, (match, offset) => {
    if (content.substring(offset - 200, offset).includes('useEffect(() => {')) return match; 
    return '// ATS score debounced';
  });
}

// 20. ErrorBoundary
const ebImport = 'import React, { ErrorBoundary } from "react";\n';
if(!content.includes('ErrorBoundary')) {
  // We'll write our own simple ErrorBoundary class since rect doesn't export ErrorBoundary directly, oh wait.
  // React doesn't export ErrorBoundary. I will write a simple class component.
  const ebClass = `
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { 
    if (this.state.hasError) return <div className="p-8 text-center text-red-500 bg-white min-h-[297mm]"><h1>Something went wrong rendering the document.</h1><button onClick={() => this.setState({hasError:false})} className="mt-4 px-4 py-2 bg-red-100 rounded">Try Again</button></div>; 
    return this.props.children; 
  }
}
`;
  content = content.replace('const App = () => {', ebClass + '\nconst App = () => {');
  
  // Wrap preview renders in BuilderView and App with ErrorBoundary
  content = content.replace(/{renderTemplatePreview\(\)}/g, '<ErrorBoundary>{renderTemplatePreview()}</ErrorBoundary>');
}

fs.writeFileSync('src/App.tsx', content);

let builder = fs.readFileSync('src/components/BuilderView.tsx', 'utf8');
if(!builder.includes('ErrorBoundary')) {
  const ebClass = `
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { 
    if (this.state.hasError) return <div className="p-8 text-center text-red-500 bg-white min-h-[297mm]"><h1>Something went wrong rendering the document.</h1><button onClick={() => this.setState({hasError:false})} className="mt-4 px-4 py-2 bg-red-100 rounded">Try Again</button></div>; 
    return this.props.children; 
  }
}
`;
  builder = builder.replace('export const BuilderView = ({', ebClass + '\nexport const BuilderView = ({');
  builder = builder.replace(/{renderTemplatePreview\(\)}/g, '<ErrorBoundary>{renderTemplatePreview()}</ErrorBoundary>');
}

// Replace BuilderView empty state
const emptyStateNew = `
            <div className="max-w-[210mm] min-h-[297mm] mx-auto bg-[var(--color-bg-2)] border border-[var(--color-border-hover)] flex flex-col items-center justify-center p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                  <div className="w-24 h-24 bg-[var(--color-bg-2)] rounded-full flex items-center justify-center mb-6 text-[var(--text-muted)] shadow-inner">
                    <FileText size={48} strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">
                    Your canvas is empty
                  </h3>
                  <p className="text-[var(--text-muted)] max-w-md mb-8 leading-relaxed text-center">
                    Start typing in the editor to build your resume.
                  </p>
                </div>
`;
const oldEmptyState = /(<div className="flex flex-col items-center justify-center text-center h-full max-w-md px-6 z-10 m-auto mt-20">[\s\S]*?<\/div>)/;
builder = builder.replace(oldEmptyState, emptyStateNew);

builder = builder.replace('(!data.name && data.experience.length === 0 && !data.summary)', '(!data.name)');

fs.writeFileSync('src/components/BuilderView.tsx', builder);


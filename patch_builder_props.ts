import fs from 'fs';

let builderContent = fs.readFileSync('src/components/BuilderView.tsx', 'utf8');

// Add props
builderContent = builderContent.replace(
  'interface BuilderViewProps {',
  'interface BuilderViewProps {\n  isLightMode?: boolean;\n  setIsLightMode?: (isLightMode: boolean) => void;'
);

builderContent = builderContent.replace(
  '}: BuilderViewProps) => {',
  '  isLightMode,\n  setIsLightMode,\n}: BuilderViewProps) => {'
);
fs.writeFileSync('src/components/BuilderView.tsx', builderContent);
console.log("Patched BuilderView Props logic");

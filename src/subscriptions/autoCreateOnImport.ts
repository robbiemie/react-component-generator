import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { createReactComponent } from '../lib/createComponent';

  // Auto watch *.tsx file
export const autoCreateOnImport = vscode.workspace.onDidSaveTextDocument((doc) => {
  if (!doc.fileName.endsWith('.tsx')) return;

  const content = doc.getText();
  const currentDir = path.dirname(doc.fileName);

  const importRegex = /import\s+\{\s*(\w+)\s*\}\s+from\s+['"](\.\/[^'"]+)['"]/g;

  let match: RegExpExecArray | null;

  while ((match = importRegex.exec(content)) !== null) {
    const componentName = match[1];      // Xxx
    const importPath = match[2];         // './Xxx'

    const absPath = path.resolve(currentDir, importPath);
    const tsxFile = absPath + '.tsx';
    const indexFile = path.join(absPath, 'index.ts');

    const isMissing = !fs.existsSync(tsxFile) && !fs.existsSync(indexFile);

    if (isMissing) {
      const parentDir = path.dirname(absPath);

      createReactComponent(componentName, parentDir, true, true);
      vscode.window.showInformationMessage(`✨ Auto-created: ${componentName}`);
    }
  }
});
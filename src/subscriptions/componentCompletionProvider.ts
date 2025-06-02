import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { createReactComponent } from '../lib/createComponent';

export const componentCompletionProvider = vscode.languages.registerCompletionItemProvider(
  { scheme: 'file', language: 'typescriptreact' },
  {
    provideCompletionItems(document, position) {
      const line = document.lineAt(position).text;
      const prefix = line.slice(0, position.character);
      const match = prefix.match(/\b([A-Z][a-zA-Z0-9_]*)$/);
      if (!match) return;

      const componentName = match[1];
      const dir = path.dirname(document.uri.fsPath);
      const abs = path.resolve(dir, componentName);
      const exists = fs.existsSync(abs + '.tsx') || fs.existsSync(path.join(abs, 'index.ts'));

      if (exists) return;

      const item = new vscode.CompletionItem(`Create component '${componentName}'`, vscode.CompletionItemKind.Snippet);
      item.insertText = componentName;
      item.command = {
        command: 'react-generator.autoCreateComponent',
        title: 'Create Component',
        arguments: [componentName, dir]
      };
      return [item];
    }
  },
  ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]();,.<> \n'.split('')
);


export const autoCreateComponentCommand = vscode.commands.registerCommand(
  'react-generator.autoCreateComponent',
  (componentName: string, currentDir: string) => {
    createReactComponent(componentName, currentDir, true, true);
    vscode.window.showInformationMessage(`✨ Component '${componentName}' created automatically.`);
  }
);
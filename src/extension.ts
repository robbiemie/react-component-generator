import * as vscode from 'vscode';
import { createReactComponent } from './createComponent';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'react-generator.createComponent',
    async (uri: any) => {
      const componentName = await vscode.window.showInputBox({
        prompt: 'Enter the component name',
        placeHolder: 'MyComponent',
      });

      if (!componentName || !uri?.fsPath) return;

      const useTypeScript = true;
      const useCssModule = true;
      const targetPath = uri.fsPath;

      createReactComponent(componentName, targetPath, useTypeScript, useCssModule);
      vscode.window.showInformationMessage(`✅ React component "${componentName}" created!`);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

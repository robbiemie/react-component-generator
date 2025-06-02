"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const createComponent_1 = require("./createComponent");
function activate(context) {
    // Manual Create React Component
    const manualCreateComponent = vscode.commands.registerCommand('react-generator.createComponent', async (uri) => {
        const componentName = await vscode.window.showInputBox({
            prompt: 'Enter the component name',
            placeHolder: 'MyComponent',
        });
        if (!componentName || !uri?.fsPath)
            return;
        const useTypeScript = true;
        const useCssModule = true;
        const targetPath = uri.fsPath;
        (0, createComponent_1.createReactComponent)(componentName, targetPath, useTypeScript, useCssModule);
        vscode.window.showInformationMessage(`✅ React component "${componentName}" created!`);
    });
    // Auto watch *.tsx file
    const autoCreateOnImport = vscode.workspace.onDidSaveTextDocument((doc) => {
        if (!doc.fileName.endsWith('.tsx'))
            return;
        const content = doc.getText();
        const currentDir = path.dirname(doc.fileName);
        const importRegex = /import\s+\{\s*(\w+)\s*\}\s+from\s+['"](\.\/[^'"]+)['"]/g;
        let match;
        while ((match = importRegex.exec(content)) !== null) {
            const componentName = match[1]; // Xxx
            const importPath = match[2]; // './Xxx'
            const absPath = path.resolve(currentDir, importPath);
            const tsxFile = absPath + '.tsx';
            const indexFile = path.join(absPath, 'index.ts');
            const isMissing = !fs.existsSync(tsxFile) && !fs.existsSync(indexFile);
            if (isMissing) {
                const parentDir = path.dirname(absPath);
                (0, createComponent_1.createReactComponent)(componentName, parentDir, true, true);
                vscode.window.showInformationMessage(`✨ Auto-created: ${componentName}`);
            }
        }
    });
    context.subscriptions.push(manualCreateComponent, autoCreateOnImport);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

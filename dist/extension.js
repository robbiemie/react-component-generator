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
const createComponent_1 = require("./createComponent");
function activate(context) {
    const disposable = vscode.commands.registerCommand('react-generator.createComponent', async (uri) => {
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
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

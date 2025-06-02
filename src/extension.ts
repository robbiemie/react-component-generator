import * as vscode from "vscode";

import { manualCreateComponent } from "./subscriptions/manualCreateComponent";
import { autoCreateOnImport } from "./subscriptions/autoCreateOnImport";
import {
  autoCreateComponentCommand,
  componentCompletionProvider,
} from "./subscriptions/componentCompletionProvider";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    manualCreateComponent,
    autoCreateOnImport,
    componentCompletionProvider,
    autoCreateComponentCommand,
  );
}

export function deactivate() {}

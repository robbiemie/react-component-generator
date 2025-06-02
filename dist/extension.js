"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const manualCreateComponent_1 = require("./subscriptions/manualCreateComponent");
const autoCreateOnImport_1 = require("./subscriptions/autoCreateOnImport");
const componentCompletionProvider_1 = require("./subscriptions/componentCompletionProvider");
function activate(context) {
    context.subscriptions.push(manualCreateComponent_1.manualCreateComponent, autoCreateOnImport_1.autoCreateOnImport, componentCompletionProvider_1.componentCompletionProvider, componentCompletionProvider_1.autoCreateComponentCommand);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

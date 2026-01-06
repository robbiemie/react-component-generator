"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const manualCreateComponent_1 = require("./subscriptions/manualCreateComponent");
function activate(context) {
    context.subscriptions.push(manualCreateComponent_1.manualCreateComponent);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

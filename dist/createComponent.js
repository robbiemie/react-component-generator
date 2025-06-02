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
exports.createReactComponent = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const createReactComponent = (componentName, targetPath, useTypeScript = true, useCssModule = true) => {
    const ext = useTypeScript ? 'tsx' : 'jsx';
    const cssExt = 'module.scss';
    const componentDir = path.join(targetPath, componentName);
    if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
    }
    const cssFile = path.join(componentDir, `index.${cssExt}`);
    const indexFile = path.join(componentDir, `index.${ext}`);
    const componentContent = `
import React from 'react';
import cx from 'classnames';

${useCssModule ? `import s from './index.${cssExt}';` : ''}

interface ${componentName}Props {
    classname?: string;
}

export const ${componentName} = (props: ${componentName}Props) => {
    const { classname } = props;
    return <div${useCssModule ? ` className={cx(s.wrapper, classname)}` : ''}>${componentName}</div>;
};
`;
    fs.writeFileSync(indexFile, componentContent.trim(), 'utf8');
    if (useCssModule) {
        fs.writeFileSync(cssFile, `.wrapper {\n  /* styles */\n}`, 'utf8');
    }
};
exports.createReactComponent = createReactComponent;

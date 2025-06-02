import * as fs from 'fs';
import * as path from 'path';


export const createReactComponent = (
  componentName: string,
  targetPath: string,
  useTypeScript: boolean = true,
  useCssModule: boolean = true
) => {
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

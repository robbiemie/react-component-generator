# react-component-generator

> A VSCode extension for React.


### 🧩 Function List

| Function                | Description                              |
| ------------------ | ------------------------------- |
| Quickly generate component template     |  Generate component structure via command or right-click menu |
| Support functional components（JS/TS）      | Configurable language type(Ts or Js)  |
| Support style generation（CSS Module） | Export the component from an index file `.module.css`  |
| Automatically generate `index.ts`    | Export the component from an index file  |
| Configurable options(via config file)      | Support options like include `PropTypes` / `interface` |


### 📁 Component Structure Example（TypeScript）


```bash
MyComponent/
├── index.ts
├── MyComponent.module.css
└── MyComponent.tsx
```



### 🔧 How To Use

1. Pack Your `.vsix`

```bash
$ npm install
$ npm run build
 ```


2. Command Install

```bash
$ npm run install
```
# rollup-plugin-copy-files

After the [Rollup](https://rollupjs.org/) / [Vite](https://vitejs.dev/) project builds, copy the files to the specified directory.

The timing point for plug-in execution is [Rollup closeBundle Hooks](https://rollupjs.org/guide/en/#output-generation-hooks).

## Installation

```bash
npm install rollup-plugin-copy-files -D
or
pnpm add rollup-plugin-copy-files -D
```

## Usage

```js
// rollup.config.js
const rollupPluginCopyAnyFiles = require('../dist/index');

const targets = {
    copy: [
        { src: './source/', target: './target/' },
    ]
}

export default {
  input: './index.ts',
  output: {
    file: './dist/index.js',
    format: 'cjs',
    name: 'index'
  },
  plugins: [rollupPluginCopyAnyFiles(targets)]
}
```

## Options

```typescript
export interface CopyOptions {
    src: string,
    target: string,
    name?: string
}

export interface BuildOptions {
    src: string,
    target: string,
    name?: string,
}

export interface Options {
    copy?: CopyOptions[],
    build?: BuildOptions[],
}
```

## TODO

- Add package operations - `BuildOptions` options.
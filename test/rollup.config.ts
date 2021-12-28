const rollupTypescript = require('@rollup/plugin-typescript');
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
  plugins: [rollupTypescript(), rollupPluginCopyAnyFiles(targets)]
}
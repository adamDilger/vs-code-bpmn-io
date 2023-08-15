import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import url from 'postcss-url';

export default {
  input: 'webview-main.js',
  output: {
    file: 'out/webview.bundle.js',
    format: 'iife',
  },
  plugins: [
    commonjs(),
    nodeResolve({
      dedupe: ['bpmn-js-properties-panel', '@bpmn-io/properties-panel'],
    }),
    url({
      url: 'inline',
    }),
    json(),
    postcss({ extract: true }),
  ],
};

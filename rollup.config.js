/* eslint-env node */

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import url from '@rollup/plugin-url';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

import css from 'rollup-plugin-css-only';

module.exports = [

  // client
  {
    input: 'src/client/bpmn-editor.js',
    output: {
      sourcemap: true,
      format: 'iife',
      file: './out/client/bpmn-editor.js'
    },
    plugins: [
      url({
        fileName: '[dirname][filename][extname]',
        publicPath: '/media/'
      }),

      css({ output: 'bpmn-editor.css' }),

      resolve(),
      commonjs(),
      json(),
    ],
    watch: {
      clearScreen: false
    }
  },

  // app
  {
    input: 'src/extension.ts',
    output: {
      sourcemap: true,
      format: 'commonjs',
      file: './out/extension.js'
    },
    external: [ 'vscode' ],
    plugins: [
      typescript(),
      resolve(),
      commonjs()
    ],
    watch: {
      clearScreen: false
    }
  }
];

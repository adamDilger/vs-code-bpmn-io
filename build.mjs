import { build } from 'esbuild';

build({
  entryPoints: ['./webview-main.js'],
  bundle: true,
  minify: true,
  loader: {
    '.eot': 'base64',
    '.woff2': 'base64',
    '.woff': 'base64',
    '.ttf': 'base64',
    '.svg': 'base64',
  },
  outfile: 'out/webview.bundle.js',
}).then(console.log);

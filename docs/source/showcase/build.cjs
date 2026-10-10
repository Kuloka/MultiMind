const fs = require('node:fs'), path = require('node:path');
const directory = path.resolve(__dirname, '../../showcase');
fs.mkdirSync(directory, { recursive: true });
require('esbuild').buildSync({ entryPoints: [path.join(__dirname, 'App.jsx')], bundle: true, minify: true, jsx: 'automatic', outfile: path.join(directory, 'showcase.js'), define: { 'process.env.NODE_ENV': '"production"' }, legalComments: 'linked' });
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(directory, 'index.html'));
console.log('Built docs/showcase — React playground');

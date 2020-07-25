import * as fs from 'fs';
import postcss from 'postcss';

import { ExportType } from './utils';

const autoprefixer = require('autoprefixer');
const precss = require('precss');

const path = require('path');

export async function CompileCSS(file: string, output: string) {
  const exportedFile = file.split('/')[file.split('/').length - 1].split('.')[0] + '.css';
  const exportedPath = path.join(output, exportedFile);
  return new Promise<{ path: string, type: ExportType }>(resolve => {
    fs.readFile(file, (err, css) => {
      postcss([precss, autoprefixer])
        .process(css, { from: file, to: exportedPath })
        .then(result => {
          fs.writeFileSync(exportedPath, result.css)
          if ( result.map ) {
            fs.writeFileSync(exportedPath + '.map', result.map as any)
          }
          resolve({ path: path.join(output, exportedFile), type: 'css' });
        })
    })

  });
  
}
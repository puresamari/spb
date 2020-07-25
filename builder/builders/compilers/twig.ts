import * as fs from 'fs';
import Twig from 'twig';

import { ExportType } from '../utils';

const path = require('path');

export async function CompileTWIG(file: string, output: string) {
  const exportedFile = file.split('/')[file.split('/').length - 1].split('.')[0] + '.html';
  return new Promise<{ path: string, type: ExportType }>(resolve => {

    Twig.renderFile(file, { filename: file, settings: {} }, (err: any, html: string) => {
      fs.writeFileSync(path.join(output, exportedFile), html);
      resolve({ path: path.join(output, exportedFile), type: 'html' });
    });
  });
  
}
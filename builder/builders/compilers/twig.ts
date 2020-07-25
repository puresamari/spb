import * as fs from 'fs';
import { twig } from 'twig';

import { ExportType } from '../utils';
import { IBuilderContext } from './../../utils';

const path = require('path');

export async function CompileTWIG(file: string, exportPath: string, context: IBuilderContext) {
  return new Promise<{ path: string, type: ExportType }>(resolve => {
    const data = fs.readFileSync(file, "utf8");
    const template = twig({ data }).render({ spb: context });
    fs.writeFileSync(exportPath, template, { });
    resolve({ path: exportPath, type: 'html' });
  });
  
}
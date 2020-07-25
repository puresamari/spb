import * as fs from 'fs';
import path from 'path';
import { twig } from 'twig';

import { ExportType } from '../utils';
import { IBuilderContext } from './../../utils';

const pretty = require('pretty');

export async function CompileTWIG(file: string, exportPath: string, context: IBuilderContext) {
  return new Promise<{ path: string, type: ExportType }>(resolve => {
    const data = fs.readFileSync(file, "utf8");
    try {
      const template = twig({
        data,
        allowInlineIncludes: true,
        async: false,
        path: path.dirname(file) + '/'
      } as any);
      fs.writeFileSync(exportPath, pretty(template.render({ spb: context })), { });
      resolve({ path: exportPath, type: 'html' });
    } catch(e) {
      console.log('Error while compiling twig', e)
      resolve()
    }
  });
  
}
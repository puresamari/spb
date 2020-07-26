import * as fs from 'fs';
import postcss from 'postcss';

import { ExportType } from '../utils';
import { IBuilderContext } from './../../utils';

export async function CompileCSS(file: string, exportPath: string, context: IBuilderContext) {
  const exportedPath = exportPath;
  return new Promise<{ path: string, type: ExportType }>(resolve => {
    const plugins = (context.options.compilers?.postcss?.plugins || []).map(require);

    // If no plugins are available copy the css file to the new directory
    if (plugins.length === 0) {
      fs.copyFile(file, exportPath, (err) => {
        resolve({ path: exportPath, type: 'css' });
      });
    } else {
      fs.readFile(file, (err, css) => {
        postcss(plugins)
          .process(css, { from: file, to: exportedPath })
          .then(result => {
            fs.writeFileSync(exportedPath, result.css);
            if ( result.map ) {
              fs.writeFileSync(exportedPath + '.map', result.map as any);
            }
            resolve({ path: exportPath, type: 'css' });
          });
      });
    }
  });
  
}
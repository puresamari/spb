import fs from 'fs';
import postcss from 'postcss';

import { IBuilderContext } from '../../utils';
import { ExportType } from '../utils';
import { AutoDiscoverCompiler } from './compiler';

export class SCSSCompiler extends AutoDiscoverCompiler {
  public readonly discoverExpression = /@import ("|')(.*?).(s|a)css("|');/g;
  public readonly removeExpression = /(@import ("|'))|("|');/g;

  public async compile(
    exportPath: string,
    context: IBuilderContext
  ) {
    return postcss([ require('precss'), require('autoprefixer') ])
      .process(fs.readFileSync(this.file, "utf8"), { from: this.file, to: exportPath })
      .then((result) => ({
        output: result.css,
        file: this.file,
        path: exportPath,
        type: 'css' as ExportType,
        affectedFiles: this.discoverExternals(this.file)
      }));
  }
}

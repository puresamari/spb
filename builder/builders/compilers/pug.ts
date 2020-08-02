import pug from 'pug';

import { ExportType } from '../utils';
import { IBuilderContext } from './../../utils';
import { AutoDiscoverCompiler } from './compiler';

const pretty = require("pretty");

export default class PUGCompiler extends AutoDiscoverCompiler {
  public readonly discoverExpression = /(extends|include) (.*?).pug/g;
  public readonly removeExpression = /((extends|include) )|(;)/g;

  public async compile(
    exportPath: string,
    context: IBuilderContext
  ) {
    const output = pug.compileFile(this.file)({ spb: context });
    
    return {
      output: pretty(output),
      file: this.file,
      path: exportPath,
      type: 'html' as ExportType,
      affectedFiles: this.discoverExternals(this.file)
    };
  }
}

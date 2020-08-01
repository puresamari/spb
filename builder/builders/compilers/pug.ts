import path from 'path';
import pug from 'pug';

import { ExportType } from '../utils';
import { IBuilderContext } from './../../utils';
import { Compiler } from './compiler';


const pretty = require("pretty");

export default class PUGCompiler extends Compiler {
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
      affectedFiles: []
    };
  }
}

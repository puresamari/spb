import * as fs from 'fs';
import path from 'path';
import pug from 'pug';

import { ExportType } from '../utils';
import { IBuilderContext } from './../../utils';
import { Compiler } from './compiler';


const pretty = require("pretty");

export default class PUGCompiler extends Compiler {
  public async compile(
    file: string,
    exportPath: string,
    context: IBuilderContext
  ) {
    const output = pug.compileFile(file)({ spb: context });

    return {
      output: pretty(output),
      file,
      path: exportPath,
      type: 'html' as ExportType,
      affectedFiles: []
    };
  }

  public async getContextFiles(
    file: string,
    exportPath: string,
    context: IBuilderContext
  ): Promise<string[]> {
    // TODO: somehow get all included files
    return [
      file,
      // ...traverseDir(path.dirname(file), file => ['html', 'twig'].includes(file.split('.')[file.split('.').length - 1]))
    ];
  }
}

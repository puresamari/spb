import fs from 'fs';
import path from 'path';
import pug from 'pug';

import { ExportType } from '../utils';
import { IBuilderContext } from './../../utils';
import { Compiler } from './compiler';


const pretty = require("pretty");

const extendsRegex = /extends (.*?).pug/g;

export default class PUGCompiler extends Compiler {

  private discoverExternals(pugFilePath: string) {
    const pugContent = fs.readFileSync(pugFilePath, 'utf-8');
    return pugContent.match(extendsRegex)?.map(v => path.resolve(path.dirname(pugFilePath), v.replace('extends ', '')));
  }

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
      affectedFiles: this.discoverExternals(this.file) || []
    };
  }
}

import fs from 'fs';
import path from 'path';

import { ExportType } from '../utils';
import { IBuilderContext } from './../../utils';
import { Compiler } from './compiler';

const pretty = require("pretty");

export default class CopyCompiler extends Compiler {

  private get Type(): ExportType {
    return path.extname(this.file).toLowerCase().slice(1) as ExportType;
  }

  private cmp() {
    switch (this.Type) {
      case 'png':
        return fs.readFileSync(this.file, 'base64');
      default:
        return fs.readFileSync(this.file);
    }
  }

  public async compile(
    exportPath: string,
    context: IBuilderContext
  ) {
    // const output = pug.compileFile(this.file)({ spb: context });

    
    // const fileData = fs.readFileSync(this.file, 'utf-8');

    return {
      output: this.cmp(),
      file: this.file,
      path: exportPath,
      type: this.Type,
      affectedFiles: []
    };
  }
}

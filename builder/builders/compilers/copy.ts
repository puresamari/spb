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
    return fs.readFileSync(this.file);
  }

  public async compile(
    exportPath: string,
    context: IBuilderContext
  ) {
    return this.postCompile({
      output: this.cmp(),
      file: this.file,
      path: exportPath,
      type: this.Type,
      affectedFiles: []
    });
  }
}

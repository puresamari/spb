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
  ): Promise<{ path: string; type: ExportType; affectedFiles: string[] }> {
    return new Promise<{
      path: string;
      type: ExportType;
      affectedFiles: string[];
    }>((resolve) => {
      const data = fs.readFileSync(file, "utf8");

      const output = pug.compileFile(file)({ spb: context });

      fs.writeFileSync(exportPath, pretty(output));

      resolve({ path: exportPath, type: "html", affectedFiles: [] });
    });
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

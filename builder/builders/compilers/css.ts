import * as fs from "fs";
import postcss from "postcss";

import { ExportType } from "../utils";
import { IBuilderContext } from "./../../utils";
import { Compiler } from './compiler';

export class CSSCompiler extends Compiler {

  public async compile(
    file: string,
    exportPath: string,
    context: IBuilderContext
  ) {
    const plugins = (context.options.compilers?.postcss?.plugins || []).map(
      require
    );
    let output = fs.readFileSync(file, "utf8");
    if (plugins.length === 0) {
    } else {
      postcss(plugins)
        .process(output, { from: file, to: exportPath })
        .then((result) => {
          output = result.css;
        });
    }
    
    return {
      output: output,
      file,
      path: exportPath,
      type: 'css' as ExportType,
      affectedFiles: []
    };
  }

  public async getContextFiles(
    file: string,
    exportPath: string,
    context: IBuilderContext
  ): Promise<string[]> { return [file]; }
}

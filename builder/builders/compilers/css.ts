import fs from "fs";
import postcss from "postcss";

import { ExportType } from "../utils";
import { IBuilderContext } from "./../../utils";
import { AutoDiscoverCompiler, Compiler } from './compiler';

const extendsRegex = /@import ("|')(.*?).css("|');/g;

export class CSSCompiler extends AutoDiscoverCompiler {
  public readonly discoverExpression = /@import ("|')(.*?).css("|');/g;
  public readonly removeExpression = /(@import ("|'))|("|');/g;

  public async compile(
    exportPath: string,
    context: IBuilderContext
  ) {
    const plugins = (context.options.compilers?.postcss?.plugins || []).map(
      require
    );
    let output = fs.readFileSync(this.file, "utf8");
    return new Promise<any>(resolve => {
    
      if (plugins.length > 0) {
        // output = await postcss(plugins).process(output, { from: file, to: exportPath }).css
        postcss(plugins).process(output, { from: this.file, to: exportPath })
          .then((result) => {
            resolve({
              output: result.css,
              file: this.file,
              path: exportPath,
              type: 'css' as ExportType,
              affectedFiles: this.discoverExternals(this.file)
            });
          });
      } else {
        resolve({
          output: output,
          file: this.file,
          path: exportPath,
          type: 'css' as ExportType,
          affectedFiles: this.discoverExternals(this.file)
        });
      }
      
    })
  }
}

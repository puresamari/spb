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
  ): Promise<{ path: string; type: ExportType; affectedFiles: string[] }> {
    const exportedPath = exportPath;

    return new Promise((resolve) => {
      const plugins = (context.options.compilers?.postcss?.plugins || []).map(
        require
      );

      // If no plugins are available copy the css file to the new directory
      if (plugins.length === 0) {
        fs.copyFile(file, exportPath, (err) => {
          resolve({ path: exportPath, type: "css", affectedFiles: [] });
        });
      } else {
        fs.readFile(file, (err, css) => {
          postcss(plugins)
            .process(css, { from: file, to: exportedPath })
            .then((result) => {
              fs.writeFileSync(exportedPath, result.css);
              if (result.map) {
                fs.writeFileSync(exportedPath + ".map", result.map as any);
              }
              resolve({ path: exportPath, type: "css", affectedFiles: [] });
            });
        });
      }
    });
  }

  public async getContextFiles(
    file: string,
    exportPath: string,
    context: IBuilderContext
  ): Promise<string[]> { return [file]; }
}

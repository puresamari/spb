import fs from 'fs';
import path from 'path';
import resolve from 'resolve';
import postcss from "postcss";

import { ExportType } from "../utils";
import { IBuilderContext } from "./../../utils";
import { AutoDiscoverCompiler, Compiler } from './compiler';

const extendsRegex = /@import ("|')(.*?).css("|');/g;

export function reqRes(file: string, basedir: string): string {
  if (path.extname(file) !== '') { return file; }
  const module = file.split('/')[file.split('/').length - 1];
  const res = resolve.sync(module, { basedir });
  return res;
}

export class CSSCompiler extends AutoDiscoverCompiler {
  public readonly discoverExpression = /@import ("|')(.*?).css("|');/g;
  public readonly removeExpression = /(@import ("|'))|("|');/g;

  public async compile(
    exportPath: string,
    context: IBuilderContext
  ) {
    const absDir = path.dirname(path.join(__filename));
    const plugins = (context.options.compilers?.postcss?.plugins || []).map(
      v => {
        const file = path.dirname(reqRes(v, path.dirname(this.file)));
        const dir = absDir;
        const resolved = path.relative(dir, file);
        console.log(file, dir, resolved);
        return require(resolved)
      }
    );
    let output = fs.readFileSync(this.file, "utf8");
    return new Promise<any>(resolve => {
    
      if (plugins.length > 0) {
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

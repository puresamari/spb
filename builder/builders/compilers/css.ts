import fs from "fs";
import postcss from "postcss";

import { ExportType } from "../utils";
import { IBuilderContext } from "./../../utils";
import { AutoDiscoverCompiler, Compiler } from './compiler';

const extendsRegex = /@import ("|')(.*?).css("|');/g;

declare var __webpack_require__: any;

export const SUPPORTED_PLUGINS_FOR_WEBPACK = [
  'tailwindcss',
  'autoprefixer'
]

export class CSSCompiler extends AutoDiscoverCompiler {
  public readonly discoverExpression = /@import ("|')(.*?).css("|');/g;
  public readonly removeExpression = /(@import ("|'))|("|');/g;


  public async compile(
    exportPath: string,
    context: IBuilderContext
  ) {
    const plugins = (context.options.compilers?.postcss?.plugins || []).map(v => {
      if (typeof __webpack_require__ === 'function') {
        // if spb is compiled with webpack, we need to explicitly require the postcss plugins.
        switch (v) {
          case 'tailwindcss': return require('tailwindcss');
          case 'autoprefixer': return require('autoprefixer');
          default:
            throw new Error('When compiling spb with webpack the postcss plugins have to be required explicitly for its bundler. Consider adding your postcss plugin to the list of plugins in the spb repo: https://github.com/puresamari/spb/blob/master/builder/builders/compilers/css.ts#L22');
        }
      }
      return require(v);
    });
    let output = fs.readFileSync(this.file, "utf8");
    return new Promise<any>(resolve => {
    
      if (plugins.length > 0) {
        // output = await postcss(plugins).process(output, { from: file, to: exportPath }).css
        postcss(plugins).process(output, { from: this.file, to: exportPath })
          .then((result) => {
            resolve(this.postCompile({
              output: result.css,
              file: this.file,
              path: exportPath,
              type: 'css' as ExportType,
              affectedFiles: this.discoverExternals(this.file)
            }));
          });
      } else {
        resolve(this.postCompile({
          output: output,
          file: this.file,
          path: exportPath,
          type: 'css' as ExportType,
          affectedFiles: this.discoverExternals(this.file)
        }));
      }
      
    })
  }
}

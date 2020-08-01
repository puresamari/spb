import * as fs from "fs";
import path from "path";
import { twig } from "twig";

import { ExportType } from "../utils";
import { IBuilderContext } from "./../../utils";
import { Compiler } from "./compiler";

const pretty = require("pretty");

const extendsRegex = /{% (extends|include) ("|')(.*?).twig("|') %}/g;

export class TWIGCompiler extends Compiler {

  private discoverExternals(twigFile: string) {
    const pugContent = fs.readFileSync(twigFile, 'utf-8');
    return pugContent.match(extendsRegex)?.map
      (v => path.resolve(path.dirname(twigFile), (v.replace(/({% (extends|include) ("|'))|("|') %}/g, '')))).filter(function(item, pos, a) {
        return a.indexOf(item) == pos;
    });
  }

  public async compile(
    exportPath: string,
    context: IBuilderContext
  ) {
    const data = fs.readFileSync(this.file, "utf8");

    const template = twig({
      data,
      async: false,
      path: path.dirname(this.file) + "/",
    } as any);

    return {
      output: pretty(template.render({ spb: context })),
      file: this.file,
      path: exportPath,
      type: 'html' as ExportType,
      affectedFiles: this.discoverExternals(this.file) || []
    };
  }
}

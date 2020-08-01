import * as fs from "fs";
import path from "path";
import { twig } from "twig";

import { ExportType } from "../utils";
import { IBuilderContext } from "./../../utils";
import { Compiler } from "./compiler";

const pretty = require("pretty");

export class TWIGCompiler extends Compiler {
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
      affectedFiles: []
    };
  }
}

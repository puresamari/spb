import * as fs from "fs";
import path from "path";
import { twig } from "twig";

import { ExportType } from "../utils";
import { IBuilderContext } from "./../../utils";
import { AutoDiscoverCompiler, Compiler } from "./compiler";

const pretty = require("pretty");

const extendsRegex = /{% (extends|include) ("|')(.*?).twig("|') %}/g;
const removeRegex = /({% (extends|include) ("|'))|(("|') %})/g;

export class TWIGCompiler extends AutoDiscoverCompiler {

  public readonly discoverExpression = /{% (extends|include) ("|')(.*?).twig("|') %}/g;
  public readonly removeExpression = /({% (extends|include) ("|'))|(("|') %})/g;

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

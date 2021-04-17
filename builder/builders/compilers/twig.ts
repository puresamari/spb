import * as fs from "fs";
import path from "path";
import { renderFile, twig, cache } from "twig";

import { ExportType } from "../utils";
import {
  IBuilderContext,
  NormalizeContextForBuildContext,
} from "./../../utils";
import { AutoDiscoverCompiler, Compiler } from "./compiler";

const pretty = require("pretty");

const extendsRegex = /{% (extends|include) ("|')(.*?).twig("|') %}/g;
const removeRegex = /({% (extends|include) ("|'))|(("|') %})/g;

cache(false);

export class TWIGCompiler extends AutoDiscoverCompiler {
  public readonly discoverExpression = /{% (extends|include) ("|')(.*?).twig("|') %}/g;
  public readonly removeExpression = /({% (extends|include) ("|'))|(("|') %})/g;

  public async compile(exportPath: string, context: IBuilderContext) {
    const data = fs.readFileSync(this.file, "utf8");
    const template = twig({
      data,
      async: false,
      path: path.dirname(this.file) + "/",
    });

    return this.postCompile({
      // output,
      output: pretty(template.render({ spb: NormalizeContextForBuildContext(context) })),
      file: this.file,
      path: exportPath,
      type: "html" as ExportType,
      affectedFiles: this.discoverExternals(this.file) || [],
    });
  }
}

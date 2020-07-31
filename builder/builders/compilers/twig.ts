import * as fs from "fs";
import path from "path";
import { twig } from "twig";

import { ExportType } from "../utils";
import { IBuilderContext } from "./../../utils";
import { Compiler } from "./compiler";

const pretty = require("pretty");

function traverseDir(dir: string, match: (file: string) => boolean): string[] {
  let files: string[] = [];
  fs.readdirSync(dir).forEach((file) => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      files = [...files, ...(traverseDir(fullPath, match))];
    } else if (match(fullPath)) {
      files.push(fullPath);
    }
  });
  return files;
}

export class TWIGCompiler extends Compiler {
  public async compile(
    file: string,
    exportPath: string,
    context: IBuilderContext
  ) {
    const data = fs.readFileSync(file, "utf8");
    const template = twig({
      data,
      async: false,
      path: path.dirname(file) + "/",
    } as any);
    return {
      output: pretty(template.render({ spb: context })),
      file,
      path: exportPath,
      type: 'html' as ExportType,
      affectedFiles: []
    };
  }

  public async getContextFiles(
    file: string,
    exportPath: string,
    context: IBuilderContext
  ): Promise<string[]> {
    return [
      file,
      ...traverseDir(path.dirname(file), file => ['html', 'twig'].includes(file.split('.')[file.split('.').length - 1]))
    ];
  }
}

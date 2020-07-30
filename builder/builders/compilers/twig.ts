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
  ): Promise<{ path: string; type: ExportType; affectedFiles: string[] }> {
    return new Promise<{
      path: string;
      type: ExportType;
      affectedFiles: string[];
    }>((resolve) => {
      const data = fs.readFileSync(file, "utf8");
      try {
        const template = twig({
          data,
          async: false,
          path: path.dirname(file) + "/",
        } as any);
        fs.writeFileSync(
          exportPath,
          pretty(template.render({ spb: context })),
          {}
        );
        resolve({ path: exportPath, type: "html", affectedFiles: [] });
      } catch (e) {
        console.log("Error while compiling twig", e);
        resolve();
      }
    });
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

// export async function CompileTWIG(context: IBuilderContext) {
//   return new Promise<{ path: string, type: ExportType, affectedFiles: string[] }>(resolve => {
//     const data = fs.readFileSync(file, "utf8");
//     try {
//       const template = twig({
//         data,
//         // allowInlineIncludes: true,
//         async: false,
//         path: path.dirname(file) + '/'
//       } as any);
//       fs.writeFileSync(exportPath, pretty(template.render({ spb: context })), { });
//       // console.log((template as any));
//       traverseDir(path.dirname(file));
//       // console.log((template as any));
//       // console.log((template as any).getBlocks().content.tempylate.blocks.defined.content.template);
//       // console.log((template as any).blocks.defined.content.template.tokens[0].token.stack);
//       resolve({ path: exportPath, type: 'html', affectedFiles: [] });
//     } catch(e) {
//       console.log('Error while compiling twig', e);
//       resolve()
//     }
//   });

// }

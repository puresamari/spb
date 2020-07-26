import { IBuilderContext } from "./../../utils";
import chalk from "chalk";
import webpack from "webpack";

import { ExportType, getExportFileName } from "../utils";
import { Compiler } from "./compiler";

const path = require("path");

export class TSCompiler extends Compiler {
  public async compile(
    file: string,
    exportPath: string,
    context: IBuilderContext
  ): Promise<{ path: string; type: ExportType; affectedFiles: string[] }> {
    const exportedFile = getExportFileName(file);
    return new Promise((resolve) => {
      const wpBuilder = webpack(
        {
          entry: {
            main: file,
          },
          output: {
            path: exportPath.split(exportedFile)[0],
            filename: exportedFile,
          },
          module: {
            rules: [
              { test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/ },
            ],
          },
          resolve: {
            extensions: [".ts", ".js"],
          },
        },
        (error, stats) => {
          if (error) {
            console.log("ERROR", error);
          } else if (stats.hasErrors()) {
            console.log(chalk.bold.red("Error occured while compilling"));
            stats.compilation.errors.forEach((err) => {
              console.log(err);
            });
          } else {
            resolve({ path: exportPath, type: "js", affectedFiles: [] });
          }
        }
      );
    });
  }

  public getContextFiles(
    file: string,
    exportPath: string,
    context: IBuilderContext
  ): string[] { return [file]; }
}

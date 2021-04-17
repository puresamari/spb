import chalk from "chalk";
import fs from "fs";
import path from "path";
import { from, Subscription, timer } from "rxjs";
import { filter, mergeMap, tap } from "rxjs/operators";

import { Builder } from "../../builder";
import { ExportType } from "../../builder/builders/utils";
import { IBuilderOptions } from "../../builder/definitions/builder-options";
import {
  IMainCommanderOptions,
  resolveFilePath,
  resolveFilePathOnBase,
} from "../utils";
import { CompilationMap, CompilationStatus } from "./compilation-map";
import { WebServer } from "./web-server";

const log = console.log;

export class DevServer {
  private readonly builder: Builder;
  public readonly webSever?: WebServer;

  private watcherSub?: Subscription;

  private watchers: fs.FSWatcher[] = [];

  private readonly files: CompilationMap;

  constructor(
    commander: IMainCommanderOptions,
    public readonly options: IBuilderOptions,
    public readonly devServerOptions = {
      port: 5678,
      socketPort: 5679,
    }
  ) {
    this.builder = new Builder(
      options,
      path.dirname(resolveFilePathOnBase(commander.config))
    );

    this.files = new CompilationMap(options);

    this.webSever = new WebServer(options, this.Files, devServerOptions);

    this.start();
  }

  public get Files() {
    return this.files.asObservable();
  }

  private getRelativeSourceFileName(file: string) {
    return path.relative(this.builder.basePath, file);
  }

  private async compileFile(file: string) {
    const exportPath = this.builder.getExportPathOfFile(file);
    if (!exportPath) {
      return;
    }
    const eFile = path.relative(this.builder.options.output, exportPath);

    this.files.changeFile(eFile);

    const result = (
      await this.builder.compile(
        async (localFile: {
          path: string;
          type: ExportType;
          affectedFiles: string[];
        }) =>
          new Promise<void>((resolve) => {
            console.log(chalk.green("compiled", this.getRelativeSourceFileName(file), '->', this.getRelativeSourceFileName(exportPath)));
            resolve();
          }),
        [file]
      )
    )[0];

    const fileOutput = this.files.getValue().get(eFile);
    if (fileOutput) {
      this.files.patchFile(eFile, {
        ...fileOutput,
        output: this.webSever?.processFile(result).output || result.output,
        compilationStatus: CompilationStatus.Compiled,
        changeAmount: fileOutput.changeAmount,
      });
    } else {
      this.files.patchFile(eFile, {
        ...result,
        output: this.webSever?.processFile(result).output || result.output,
        compilationStatus: CompilationStatus.Compiled,
        changeAmount: 1,
      });
    }
  }

  private async start() {
    this.watcherSub = this.builder.ContextFiles.subscribe(
      async (contextFiles) => {
        log("Watching files");
        contextFiles
          .map(({ files, source }) =>
            chalk.underline.blue(
              `${this.getRelativeSourceFileName(source)}${
                files.length > 0
                  ? chalk.cyan` \n    watched through context (require or import):\n     - ${files
                      .map((file) => this.getRelativeSourceFileName(file))
                      .join("\n     - ")}`
                  : ""
              }`
            )
          )
          .forEach((v) => log("  " + v));
        log("");

        this.watchers.forEach((watcher) => {
          watcher.close();
        });

        await contextFiles.forEach(async (context) => {
          [...context.files].forEach((file) => {
            console.log('watching file', file)
            try {
              this.watchers.push(
                fs.watch(file, (curr: any, prev: any) => {
                  this.compileFile(context.source);
                })
              );
            } catch (e) {
              console.log("FILE", file);
              console.log(e);
            }
          });
          await this.compileFile(context.source);
        });
      }
    );
  }

  public async destroy() {
    this.watcherSub?.unsubscribe();
    return this.webSever!.destroy();
  }
}

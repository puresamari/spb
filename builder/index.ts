import mkdirp from 'mkdirp';
import path from 'path';

import { getCompiler } from './builders';
import { Compiler } from './builders/compilers/compiler';
import { CompilerResult } from './builders/compilers/definitions';
import { ExportType, getExportFileName } from './builders/utils';
import { IBuilderContext, IBuilderOptions } from './utils';

export class Builder {
  constructor(public readonly options: IBuilderOptions) {
    const exportedFiles = options.files.map((v) => getExportFileName(v));
    this.builderContext = {
      stylesheets: exportedFiles.filter((v) => v.endsWith("css")),
      scripts: exportedFiles.filter((v) => v.endsWith("js")),
      html: exportedFiles.filter((v) => v.endsWith("html")),
      options,
    };
    options.files.forEach(file => {
      this.compilers.set(file, getCompiler(file));
    });
  }

  public get Files() { return [...this.compilers.keys()]; }
  public getExportPathOfFile(file: string) { return this.compilers.get(file)?.getExportFilePath(this.options.output); }

  public async getContextFiles() {
    let contextFiles: {
      source: string,
      files: string[]
    }[] = [];
    const files = this.Files;
    for (let i = 0; i < files.length; i++) {
      contextFiles.push({
        source: files[i],
        files: await this.compilers.get(files[i])!.getContextFiles(
          this.options.output,
          this.builderContext
        )
      });
    }
    return contextFiles;
  }

  public readonly builderContext: IBuilderContext;

  private readonly compilers = new Map<string, Compiler>();

  public async compile(
    onFileBuildFinished?: ((file: {
      path: string;
      type: ExportType;
      affectedFiles: string[];
    }) => Promise<void>) | null,
    files: string[] = this.Files
  ) {
    const compiledFiles: CompilerResult[] = [];
    // await mkdirp(this.options.output);
    for (let i = 0; i < files.length; i++) {
      compiledFiles.push(await this.compilers.get(files[i])!.compile(
        this.options.output,
        this.builderContext
      ));
      if (onFileBuildFinished) { await onFileBuildFinished(compiledFiles[i]); }
    }
    return compiledFiles;
  }

  public async build(
    onFileBuildFinished?: (file: {
      path: string;
      type: ExportType;
      affectedFiles: string[];
    }) => Promise<void>,
    files: string[] = this.Files
  ) {
    await mkdirp(this.options.output);
    for (let i = 0; i < files.length; i++) {
      const built = await this.compilers.get(files[i])!.build(
        this.options.output,
        this.builderContext
      );
      if (onFileBuildFinished) { await onFileBuildFinished(built); }
    }
  }
}

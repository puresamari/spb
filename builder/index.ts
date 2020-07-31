import mkdirp from 'mkdirp';
import path from 'path';

import { buildFile, compileFile, getContextFiles } from './builders';
import { CompilerResult } from './builders/compilers/definitions';
import { ExportType, getExportFileName, getFileType } from './builders/utils';
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
  }

  public async getContextFiles() {
    let contextFiles: {
      source: string,
      files: string[]
    }[] = [];
    for (let i = 0; i < this.options.files.length; i++) {
      if (!!getFileType(this.options.files[i])) {
        contextFiles.push({
          source: this.options.files[i],
          files: await getContextFiles(
            this.options.files[i],
            this.options.output,
            this.builderContext
          )
        });
      }
    }
    return contextFiles;
  }

  public readonly builderContext: IBuilderContext;

  public async compile(
    onFileBuildFinished?: ((file: {
      path: string;
      type: ExportType;
      affectedFiles: string[];
    }) => Promise<void>) | null,
    files: string[] = this.options.files
  ) {
    const compiledFiles: CompilerResult[] = [];
    await mkdirp(this.options.output);
    for (let i = 0; i < files.length; i++) {
      if (!!getFileType(files[i])) {
        compiledFiles.push(await compileFile(
          files[i],
          this.options.output,
          this.builderContext
        ));
        if (onFileBuildFinished) { await onFileBuildFinished(compiledFiles[i]); }
      }
    }
    return compiledFiles;
  }

  public async build(
    onFileBuildFinished?: (file: {
      path: string;
      type: ExportType;
      affectedFiles: string[];
    }) => Promise<void>,
    files: string[] = this.options.files
  ) {
    await mkdirp(this.options.output);
    for (let i = 0; i < files.length; i++) {
      if (!!getFileType(files[i])) {
        const built = await buildFile(
          files[i],
          this.options.output,
          this.builderContext
        );
        if (onFileBuildFinished) { await onFileBuildFinished(built); }
      }
    }
  }
}

import { buildFile, getContextFiles } from "./builders";
import { getExportFileName, ExportType } from "./builders/utils";
import { IBuilderContext, IBuilderOptions } from "./utils";
import fs from "fs";
import mkdirp from "mkdirp";

const path = require("path");

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
      contextFiles.push({
        source: this.options.files[i],
        files: await getContextFiles(
          this.options.files[i],
          this.options.output,
          this.builderContext
        )
      });
    }
    return contextFiles;
  }

  public readonly builderContext: IBuilderContext;

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
      const built = await buildFile(
        files[i],
        this.options.output,
        this.builderContext
      );
      if (onFileBuildFinished) { await onFileBuildFinished(built); }

    }
  }
}

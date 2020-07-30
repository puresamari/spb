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
    let contextFiles: string[] = [];
    for (let i = 0; i < this.options.files.length; i++) {
      contextFiles = [
        ...contextFiles,
        ...(await getContextFiles(
          this.options.files[i],
          this.options.output,
          this.builderContext
        )),
      ];
    }
    return contextFiles;
  }

  private contextFiles: string[] = [];

  public readonly builderContext: IBuilderContext;

  public async build(
    onFileBuildFinished?: (file: {
      path: string;
      type: ExportType;
      affectedFiles: string[];
    }) => Promise<void>
  ) {
    this.contextFiles = await this.getContextFiles();
    await mkdirp(this.options.output);
    for (let i = 0; i < this.options.files.length; i++) {
      const built = await buildFile(
        this.options.files[i],
        this.options.output,
        this.builderContext
      );
      if (onFileBuildFinished) { await onFileBuildFinished(built); }

    }
  }
}

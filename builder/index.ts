import { buildFile, getContextFiles } from './builders';
import { getExportFileName } from './builders/utils';
import { IBuilderContext, IBuilderOptions } from './utils';
import fs from 'fs';
import mkdirp from 'mkdirp';

const path = require('path');

export class Builder {
  constructor(public readonly options: IBuilderOptions) {

    const exportedFiles = options.files.map(v => getExportFileName(v));
    this.builderContext = {
      stylesheets: exportedFiles.filter(v => v.endsWith('css')),
      scripts: exportedFiles.filter(v => v.endsWith('js')),
      html: exportedFiles.filter(v => v.endsWith('html')),
      options
    };
  }

  public async getContextFiles() {
    let contextFiles: string[] = [];
    for (let i = 0; i < this.options.files.length; i++) {
      contextFiles = [
        ...contextFiles,
        ...(await getContextFiles(this.options.files[i], this.options.output, this.builderContext))
      ]
    }
    return contextFiles;
  }

  private contextFiles: string[] = [];

  public readonly builderContext: IBuilderContext;

  public async build() {
    this.contextFiles = await this.getContextFiles();
    await mkdirp(this.options.output);
    await this.options.files.forEach(async file => await buildFile(file, this.options.output, this.builderContext));
  }

}
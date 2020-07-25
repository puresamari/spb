import { buildFile } from './builders';
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
      html: exportedFiles.filter(v => v.endsWith('html'))
    };
  }

  public readonly builderContext: IBuilderContext;

  public async build() {
    await mkdirp(this.options.output);
    await this.options.files.forEach(async file => await buildFile(file, this.options.output, this.builderContext));
  }
}
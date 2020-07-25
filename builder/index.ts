import chalk from 'chalk';
import webpack from 'webpack';
import Twig from 'twig';
import { buildFile } from './builders';

const fs = require('fs');
const path = require('path');

export interface IBuilderOptions {
  output: string,
  files: string[];
}

interface IBuilderContext {
  files: Map<string, 'js' | 'css'>;
}

export class Builder {
  constructor(public readonly options: IBuilderOptions) {
  }

  private context: IBuilderContext = { files: new Map<string, 'js' | 'css'>()  }

  public get Context(): IBuilderContext { return this.context; }

  public async build() {
    await this.options.files.forEach(async file => await buildFile(file, this.options.output));
  }
}
import fs from 'fs';
import { Builder } from '../builder';
import { CompielableType } from '../builder/builders/compilers';
import { ExportType } from '../builder/builders/utils';
import { IBuilderOptions } from '../builder/definitions/builder-options';
import chalk from 'chalk';
import { Bar, Presets } from 'cli-progress';
import * as path from 'path';

import glob from "glob";

// TODO: Wow thats an ugly solution for getting the version number
export const version: string = (() => {
  try {
    return require('../package.json').version;
  } catch {
    try {
      return require('../../package.json').version;
    } catch {
      return 'unknown';
    }
  }
})();

export const basePath = process.cwd();
export interface IMainCommanderOptions {
  out?: string,
  files?: string | string[],
  config: string
};

export function resolveFilePath(file: string) {
  return path.resolve(basePath, file);
}

function getConfig(configPath: string): IBuilderOptions {
  const dir = path.dirname(configPath);
  try {
    const configs = JSON.parse(fs.readFileSync(resolveFilePath(configPath), 'utf-8')) as IBuilderOptions;
    // const configs = require(resolveFilePath(configPath)) as IBuilderOptions;
    return {
      ...configs,
      output: path.resolve(dir, configs.output),
      files: collectFiles(configs.files.map(v => path.join(dir, v)))
    };
  } catch (e) {
    console.error('Error while getting config', configPath);
    console.error(e);
    process.exit(100);
  }
}

export function collectFiles(files: string[]) {
  let retFiles: string[] = [];
  files.forEach(pattern => {
    retFiles = [
      ...retFiles,
      ...glob.sync(pattern)
    ]
  });
  return retFiles.map(resolveFilePath);
}

export function generateConfig(options: IMainCommanderOptions): IBuilderOptions {
  const config: IBuilderOptions = options.config ? getConfig(options.config) || { output: '', files: [] } : { output: '', files: [] };
  if (options.out) { config.output = resolveFilePath(options.out); }
  if (options.files) {
    if (typeof options.files === 'string') {
      config.files = collectFiles([options.files]);
    } else if (options.files.length > 0) {
      config.files = collectFiles(options.files);
    }
  }
  return config;
}

export function chalkFileType(type: CompielableType | ExportType) {
  switch(type) {
    case 'twig':             return chalk.white.bgGreen(' twig ');
    case 'pug':  return chalk.white.bgRgb(168, 100, 84)(' pug  ');
    case 'css':               return chalk.white.bgBlue(' css  ');
    case 'ts':                return chalk.white.bgBlue(' ts   ');
    case 'js':              return chalk.black.bgYellow(' js   ');
    case 'html':  return chalk.white.bgRgb(212, 87, 56)(' html ');
    case 'scss': return chalk.white.bgRgb(191, 64, 128)(' scss ');
    case 'ts':                       return chalk.white(' ts   ');
    default: 
      return chalk.white(' ' + type.padEnd(4, ' ').slice(0,4) + ' ');
  }
}

export function chalkFile(file: string) {
  const ending = file.split('.')[file.split('.').length - 1] as CompielableType | ExportType;
  return `${ chalkFileType(ending)}: ${chalk.blue.underline(file)}`
}

export async function printBuilder(builder: Builder) {
  console.log(chalk`
Input:
  ${builder.options.files.map(chalkFile).join('\n  ')}
`);

  await builder.build();
}

export function getProgressBar(builder: Builder) {
  const bar = new Bar({}, Presets.shades_classic);
  return bar;
}

export async function build(builder: Builder, progressBar: Bar, file?: string) {

  progressBar.start(file ? 1 : builder.Files.length, 0);

  await builder.build(async v => await progressBar.increment(1), file ? [file] : builder.Files);
  
  progressBar.stop();


  if (file) {
    return console.log(chalk`
  ${chalkFile(file)}
`);

  }

  const outputs = ([...builder.builderContext.stylesheets, ...builder.builderContext.scripts, ...builder.builderContext.html, ...builder.builderContext.other]).map(v => `${builder.options.output}/${v}`);
  console.log(chalk`
OUTPUT:
  ${outputs.map(chalkFile).join('\n  ')}
`);

}
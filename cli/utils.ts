import { Builder } from './../builder/index';
import chalk from 'chalk';
import * as path from 'path';

import { IBuilderOptions } from './../builder/definitions/builder-options';
import { option } from 'commander';

export const version = '0.0.1';

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
    const configs = require(resolveFilePath(configPath)) as IBuilderOptions;
    return {
      ...configs,
      output: path.resolve(dir, configs.output),
      files: configs.files.map(v => path.resolve(dir, v))
    };
  } catch {
    return {
      output: path.resolve(dir, 'dist'),
      files: []
    };
  }
}

export function generateConfig(options: IMainCommanderOptions): IBuilderOptions {
  const config: IBuilderOptions = options.config ? getConfig(options.config) || { output: '', files: [] } : { output: '', files: [] };
  if (options.out) { config.output = resolveFilePath(options.out); }
  if (options.files) {
    if (typeof options.files === 'string') {
      config.files = [resolveFilePath(options.files)];
    } else if (options.files.length > 0) {
      config.files = options.files.map(resolveFilePath);
    }
  }
  return config;
}

export function chalkFileType(type: 'ts' | 'css' | 'twig' | string) {
  switch(type) {
    case 'twig':            return chalk.white.bgGreen(' twig ');
    case 'css':              return chalk.white.bgBlue(' css  ');
    case 'ts':               return chalk.white.bgBlue(' ts   ');
    case 'js':             return chalk.black.bgYellow(' js   ');
    case 'html': return chalk.white.bgRgb(212, 87, 56)(' html ');
    default:                        return chalk.white(' ---- ');
  }
}

export function chalkFile(file: string) {
  const ending = file.split('.')[file.split('.').length - 1];
  return `${ chalkFileType(ending)}: ${chalk.blue.underline(file)}`
}

export async function build(builder: Builder) {
  const outputs = ([...builder.builderContext.stylesheets, ...builder.builderContext.scripts, ...builder.builderContext.html]).map(v => `${builder.options.output}/${v}`);
  console.log(chalk`
{yellow Building...}

INPUT
  ${builder.options.files.map(chalkFile).join('\n  ')}

OUTPUT:
  ${outputs.map(chalkFile).join('\n  ')}

`);

  await builder.build();
}
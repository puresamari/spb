import { IBuilderOptions } from './../builder/definitions/builder-options';
import { Command } from 'commander';
import * as pathT from 'path';

import { Builder } from './../builder';
import { resolveFilePath } from './utils';

const chalk = require('chalk');
const log = console.log;

function chalkFileType(type: 'ts' | 'css' | 'twig' | string) {
  switch(type) {
    case 'twig': return chalk.white.bgGreen(' twig ');
    case 'css':   return chalk.white.bgBlue(' css  ');
    case 'ts':    return chalk.white.bgBlue(' ts   ');
    default:    return chalk.white.bgYellow(' ---- ');
  }
}

function chalkFile(file: string) {
  const ending = file.split('.')[file.split('.').length - 1];
  return `${ chalkFileType(ending)}: ${chalk.blue.underline(file)}`
}

async function run(options: IBuilderOptions) {
  const builder = new Builder(options);

  log(chalk`
OUTPUT:
  STYLESHEETS:
    ${chalk.blue.underline(builder.builderContext.stylesheets.join('\n    '))}
  SCRIPTS:
    ${chalk.blue.underline(builder.builderContext.scripts.join('\n    '))}
  HTML:
    ${chalk.blue.underline(builder.builderContext.html.join('\n    '))}

FILES
  ${builder.options.files.map(chalkFile).join('\n  ')}
  `);

  await builder.build();
}

function getConfig(path: string): IBuilderOptions {
  const dir = pathT.dirname(path);
  const configs = require(resolveFilePath(path)) as IBuilderOptions;
  return {
    ...configs,
    output: pathT.resolve(dir, configs.output),
    files: configs.files.map(v => pathT.resolve(dir, v))
  }
}

export function make() {
  const heat = new Command('build');

  heat.command('manual [out] [files...]', { isDefault: true })
    .option('-c, --config <path>', 'path to config json file')
    .action(async (path: string | null, files: string[] | null, options: { config?: string }) => {
      const config: IBuilderOptions = options.config ? getConfig(options.config) : { output: '', files: [] };
      if (path) { config.output = resolveFilePath(path); }
      if (files && files.length > 0) { config.files = files.map(resolveFilePath); }
      run(config);
    });
  return heat;
}
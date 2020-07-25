import { Command } from 'commander';
import path from 'path';

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

export function make() {
  const heat = new Command('compile');

  heat.command('build <out> <files...>', { isDefault: true })
    .action(async (path, files) => {
      const builder = new Builder({
        output: resolveFilePath(path),
        files: files.map(resolveFilePath)
      });

      log(chalk`
OUTPUT: ${chalk.blue.underline(builder.options.output)}
FILES
  ${builder.options.files.map(chalkFile).join('\n  ')}
      `);

      await builder.build();
    });
  return heat;
}
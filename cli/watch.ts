import { Command } from 'commander';
import fs from 'fs';
import chalk from 'chalk';

import { Builder } from './../builder';
import { build, generateConfig, IMainCommanderOptions } from './utils';

// const chalk = require('chalk');

const log = console.log;

export function make(program: Command) {
  const heat = new Command('watch');

  heat
    .action(async () => {
      const config = generateConfig(program.opts() as IMainCommanderOptions);
      const builder = new Builder(config);

      log('Watching files');
      builder.contextFiles.forEach(v => log('  ' + chalk.underline.blue(v)))

      builder.contextFiles.forEach(file => {
        fs.watchFile(file, () => build(builder));
      });
      build(builder);
    });
  return heat;
}
import { Command } from 'commander';
import fs from 'fs';
import chalk from 'chalk';

import { Builder } from './../builder';
import { build, generateConfig, getProgressBar, IMainCommanderOptions, printBuilder } from './utils';

// const chalk = require('chalk');

const log = console.log;

export function make(program: Command) {
  const heat = new Command('watch');

  heat
    .action(async () => {
      const config = generateConfig(program.opts() as IMainCommanderOptions);
      const builder = new Builder(config);
      printBuilder(builder);
      const progressBar = getProgressBar(builder);

      const contextFiles = await builder.getContextFiles();

      log('Watching files');
      contextFiles.forEach(v => log('  ' + chalk.underline.blue(v)))

      contextFiles.forEach(file => {
        fs.watchFile(file, () => build(builder, progressBar));
      });

      // build(builder);
    });
  return heat;
}
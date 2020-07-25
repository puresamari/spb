import { Command } from 'commander';
import fs from 'fs';

import { Builder } from './../builder';
import { build, generateConfig, IMainCommanderOptions } from './utils';

const chalk = require('chalk');

const log = console.log;

export function make(program: Command) {
  const heat = new Command('watch');

  heat
    .action(async () => {
      log('Watching...');

      const config = generateConfig(program.opts() as IMainCommanderOptions);
      const builder = new Builder(config);

      config.files.forEach(file => {
        fs.watchFile(file, () => build(builder));
      });
      build(builder);
    });
  return heat;
}
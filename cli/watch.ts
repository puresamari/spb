import chalk from 'chalk';
import { execSync } from 'child_process';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

import { Builder } from '../builder';
import { build, generateConfig, getProgressBar, IMainCommanderOptions, printBuilder, resolveFilePath } from './utils';

// const chalk = require('chalk');

const log = console.log;

export function make(program: Command) {
  const heat = new Command('watch');

  heat
    .action(async () => {
      const config = generateConfig(program.opts() as IMainCommanderOptions);
      const builder = new Builder(config, path.dirname(resolveFilePath((program.opts() as IMainCommanderOptions).config)));

      if (config.clearOutputFolder !== false) {
        rimraf.sync(path.join(config.output, '*'));
      }

      function _build(source?: string) {
        build(builder, progressBar, source);

        if (config.postBuild) {
          execSync(config.postBuild);
        }
  
      }


      printBuilder(builder);
      const progressBar = getProgressBar(builder);

      const contextFiles = await builder.getContextFiles();
      
      log('Watching files');
      contextFiles.map(v => v.files.map(file => chalk.underline.blue(file)).join('\n  ')).forEach(v => log('  ' + v));
      log('');

      contextFiles.forEach(context => {
        [ ...context.files ].forEach((file) => {
          fs.watchFile(file, () => {
            _build(context.source);
          });
        });
      });

      _build();
    });
  return heat;
}
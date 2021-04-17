import { Subscription } from 'rxjs';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

import { Builder } from '../builder';
import { build, generateConfig, getProgressBar, IMainCommanderOptions, printBuilder, resolveFilePathOnBase } from './utils';
import { first } from 'rxjs/operators';

// const chalk = require('chalk');

const log = console.log;

let sub: Subscription | undefined;

export function make(program: Command) {
  const heat = new Command('watch');

  heat
    .action(async () => {
      const config = generateConfig(program.opts() as IMainCommanderOptions);
      const builder = new Builder(config, path.dirname(resolveFilePathOnBase((program.opts() as IMainCommanderOptions).config)));

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

      sub?.unsubscribe();
      sub = builder.ContextFiles.pipe(
        first() // TODO: Should dynamically remove the watchers when context files change
      ).subscribe(cFiles => {
        cFiles.forEach(({ source, files }) => {
          chalk.underline.blue(source);
          files.forEach(file => {
            chalk.underline.blue('  - ' + file);
            fs.watchFile(file, () => {
              _build(source);
            });
          })
        })
      });
      log('');

      _build();
    });
  return heat;
}
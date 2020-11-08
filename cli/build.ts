import { Command } from 'commander';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

import { Builder } from '../builder';
import { build, generateConfig, getProgressBar, IMainCommanderOptions, printBuilder, resolveFilePath, resolveFilePathOnBase } from './utils';
import { IBuilderOptions } from 'builder/utils';

const log = console.log;

export function make(program: Command) {
  const heat = new Command('build');

  heat
    .action(async () => {

      const config = generateConfig(program.opts() as IMainCommanderOptions);

      if (config.clearOutputFolder !== false) {
        rimraf.sync(path.join(config.output, '*'));
      }

      const builder = new Builder(config, path.dirname(resolveFilePathOnBase((program.opts() as IMainCommanderOptions).config)));
      printBuilder(builder);

      await build(builder, getProgressBar(builder));

      if (config.postBuild) {
        await execSync(config.postBuild);
      }

    });
  return heat;
}
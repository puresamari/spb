import { Builder, generateConfig, IMainProcessOptions, resolveFilePathOnBase } from '@puresamari/spb-core';
import { execSync } from 'child_process';
import { Command } from 'commander';
import path from 'path';
import rimraf from 'rimraf';

import { build, getProgressBar, printBuilder } from './utils';

export function make(program: Command) {
  const heat = new Command('build');

  heat
    .action(async () => {

      const config = generateConfig(program.opts() as IMainProcessOptions);

      if (config.clearOutputFolder !== false) {
        rimraf.sync(path.join(config.output, '*'));
      }

      const builder = new Builder(config, path.dirname(resolveFilePathOnBase((program.opts() as IMainProcessOptions).config)));
      printBuilder(builder);

      await build(builder, getProgressBar(builder));

      if (config.postBuild) {
        await execSync(config.postBuild);
      }

    });
  return heat;
}
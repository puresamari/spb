import { Command } from 'commander';

import { Builder } from './../builder';
import { build, generateConfig, getProgressBar, IMainCommanderOptions, printBuilder } from './utils';

const log = console.log;

export function make(program: Command) {
  const heat = new Command('build');

  heat
    .action(async () => {

      const config = generateConfig(program.opts() as IMainCommanderOptions);
      const builder = new Builder(config);
      printBuilder(builder);

      build(builder, getProgressBar(builder));
    });
  return heat;
}
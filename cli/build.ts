import { Command } from 'commander';

import { Builder } from './../builder';
import { build, generateConfig, IMainCommanderOptions } from './utils';

const log = console.log;

export function make(program: Command) {
  const heat = new Command('build');

  heat
    .action(async () => {
      log('Building...');

      const config = generateConfig(program.opts() as IMainCommanderOptions);
      const builder = new Builder(config);

      build(builder);
    });
  return heat;
}
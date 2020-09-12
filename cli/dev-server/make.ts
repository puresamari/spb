import { Command } from 'commander';

import { DevServer } from './index';
import { generateConfig, IMainCommanderOptions } from '../utils';

export function make(program: Command) {
  const heat = new Command('dev-server');

  heat
    .action(async () => {
      const config = generateConfig(program.opts() as IMainCommanderOptions);
      const devServer = new DevServer(program.opts() as IMainCommanderOptions, config);
    });
  return heat;
}
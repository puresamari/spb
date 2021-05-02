import { generateConfig, IMainProcessOptions } from '@puresamari/spb-core';
import { DevServer } from '@puresamari/spb-dev-server';
import { Command } from 'commander';


export function make(program: Command) {
  const heat = new Command('dev-server');

  heat
    .action(async () => {
      const config = generateConfig(program.opts() as IMainProcessOptions);
      const devServer = new DevServer(program.opts() as IMainProcessOptions, config);
    });
  return heat;
}
import { generateConfig, IMainProcessOptions } from '@puresamari/spb-core';
import { DevServer } from '@puresamari/spb-dev-server';
import { IDevServerOptions } from '@puresamari/spb-dev-server';
import { Command } from 'commander';


export function make(program: Command) {
  const heat = new Command('dev-server');

  heat
    .option('-s, --secure', 'Secure dev server')
    .option('-h, --host <host>', 'Host', 'localhost')
    .option('-p, --port <port>', 'Port', (modulate, old) => parseInt(modulate), 5678)
    .option('--socket-port <socket-port>', 'Port for Socket', (modulate, old) => parseInt(modulate), 5679)
    .action(async (options: IDevServerOptions) => {
      const config = generateConfig(program.opts() as IMainProcessOptions);
      const devServer = new DevServer(program.opts() as IMainProcessOptions, config, options);
    });
  return heat;
}
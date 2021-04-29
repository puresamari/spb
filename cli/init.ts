import { IBuilderOptions } from '@puresamari/spb-core';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

import { basePath } from './utils';

const log = console.log;

async function getValue<T extends string | number | boolean = string>(question: string, initial?: T) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let query = question;
  if (initial) {
    query += ` (Default: '${initial}')`;
  }

  return await new Promise<T>(resolve => rl.question(`${query}: `, ans => {
      rl.close();
      resolve((ans || initial) as T);
  }))
}

export function make(program: Command) {
  return (new Command('init'))
    .action(async () => {
      // log('Init command will be implemented');
      const spbPath = await getValue('Where should your spb enviroment be generated', basePath);
      const output = await getValue('Where should the file be bundled outputted to relative to "' + spbPath + '".', 'dist');
      log(`\nNow select the files you want to compile.\nYou can use * as a wildcard for selecting multiple files.\nEnter the filenames relative to '${spbPath}'\n\n(Leave empty and hit enter to finish file selection)`);
      
      let config: IBuilderOptions = {
        output,
        files: []
      };

      // const files: string[] = [];
      let selectingFiles = true;
      while (selectingFiles) {
        const file = await getValue<string>('Enter filename');
        if (file) { config.files.push(file); }
        else {
          selectingFiles = false;
        }
      }

      const configFileContents = {
        '$schema': 'node_modules/@puresamari/spb/lib/config.schema.json',
        ...config
      };

      fs.writeFileSync(path.join(spbPath, 'config.spb.json'), JSON.stringify(configFileContents));
      
      console.log('Successfully created the config file "' + path.join(spbPath, 'config.spb.json') + '"')
      console.log('Now just run "spb dev-server -c config.spb.json" to start developing.');
    });
}
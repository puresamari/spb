#!/usr/bin/env node

import { program } from 'commander';

import { make as makeBuild } from './build';
// import { make as makeWatch } from './watch';
import { version } from './utils';


const chalk = require('chalk');
const log = console.log;

log(
  chalk.green(
    require('figlet').textSync('Simple Page Builder', {
      font: 'Big',
      horizontalLayout: 'default',
      verticalLayout: 'default',
    })
  ),
  chalk.bold.green('(spb)\n'),
  chalk.yellow(
    'CLI Version', version, '\n'
  )
);

program
  .name('spb')
  .version(version)
  .option('--verbose', 'log verbose');

program.addCommand(makeBuild(), { isDefault: true });
// program.addCommand(makeWatch());

program.parse(process.argv);

export {};
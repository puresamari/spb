#!/usr/bin/env node

import { program } from 'commander';

import { make as makeBuild } from './build';
import { make as makeWatch } from './watch';
import { make as makeInit } from './init';
import { make as makeDevServer } from './dev-server';
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
  .storeOptionsAsProperties(true)
  .passCommandToAction(true)
  .version(version)


program.addCommand(makeWatch(program as any));

const programForBuilding = program
  .option('-c, --config <path>', 'path to config json file', 'config.spb.json')
  .option('-o, --out <path>', 'director to compile to')
  .option('--verbose', 'log verbose')
  .option('--files <path...>', 'Files to compile', [] as any);
  
programForBuilding.addCommand(makeBuild(program as any), { isDefault: true });
programForBuilding.addCommand(makeInit(program as any));
programForBuilding.addCommand(makeDevServer(program as any));

program.parse(process.argv);

export {};
import chalk from 'chalk';
import webpack from 'webpack';

import { ExportType } from '../utils';

const path = require('path');

export async function CompileTS(file: string, output: string) {
  const exportedFile = file.split('/')[file.split('/').length - 1].split('.')[0] + '.js';
  return new Promise<{ path: string, type: ExportType }>(resolve => {
    const wpBuilder = webpack({
      entry: {
        main: file
      },
      output: {
        path: output,
        filename: exportedFile
      },
      module: {
        rules: [
          { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ },
        ]
      }
    }, (error, stats) => {
      if (error) {
        console.log('ERROR', error);
      } else if (stats.hasErrors()) {
        console.log(chalk.bold.red('Error occured while compilling'));
        stats.compilation.errors.forEach(err => {
          console.log(chalk.red(' ', err));
        })
      } else {
        resolve({ path: path.join(output, exportedFile), type: 'js' });
      }
    });
  })
}
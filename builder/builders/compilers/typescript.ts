import { IBuilderContext } from './../../utils';
import chalk from 'chalk';
import webpack from 'webpack';

import { ExportType, getExportFileName } from '../utils';

const path = require('path');

export async function CompileTS(file: string, exportPath: string, context: IBuilderContext) {
  const exportedFile = getExportFileName(file);
  return new Promise<{ path: string, type: ExportType }>(resolve => {
    const wpBuilder = webpack({
      entry: {
        main: file
      },
      output: {
        path: exportPath.split(exportedFile)[0],
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
        resolve({ path: exportPath, type: 'js' });
      }
    });
  })
}
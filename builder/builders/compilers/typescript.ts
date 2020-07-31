import { TypescriptBundler } from '@puresamari/ts-bundler';
import * as fs from 'fs';
import { stringify } from 'querystring';

import { IBuilderContext } from '../../utils';
import { ExportType } from '../utils';
import { Compiler } from './compiler';

export default class TypescriptCompiler extends Compiler {

  public async compile(
    file: string,
    exportPath: string,
    context: IBuilderContext
  ) {
    const exportedPath = exportPath;

    const bundler = new TypescriptBundler(file);
    const result = await bundler.bundle();

    return {
      output: result.output,
      file,
      path: exportedPath,
      type: 'js' as ExportType,
      affectedFiles: []
    };
  }

  public async getContextFiles(
    file: string,
    exportPath: string,
    context: IBuilderContext
  ): Promise<string[]> {
    const bundler = new TypescriptBundler(file);
    const result = await bundler.bundle();
    return [
      file,
      ...result.modules.filter((v: any) => !v.node_module).map(v => v.file)
    ];
  }
}

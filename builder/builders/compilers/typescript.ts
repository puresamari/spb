import { TypescriptBundler } from '@puresamari/ts-bundler';
import * as fs from 'fs';

import { IBuilderContext } from '../../utils';
import { ExportType } from '../utils';
import { Compiler } from './compiler';

export default class TypescriptCompiler extends Compiler {

  public async compile(
    file: string,
    exportPath: string,
    context: IBuilderContext
  ): Promise<{ path: string; type: ExportType; affectedFiles: string[] }> {
    const exportedPath = exportPath;


    const bundler = new TypescriptBundler(file);
    const result = await bundler.bundle();

    fs.writeFileSync(exportedPath, result.output);

    return {
      path: exportedPath,
      type: 'js',
      affectedFiles: result.modules
    };
  }

  public async getContextFiles(
    file: string,
    exportPath: string,
    context: IBuilderContext
  ): Promise<string[]> {
    const bundler = new TypescriptBundler(file);
    const result = await bundler.bundle();
    return result.modules;
  }
}

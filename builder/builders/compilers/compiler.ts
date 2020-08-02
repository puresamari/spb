import fs from 'fs';
import path from 'path';
import { getExportPath } from '../utils';

import { IBuilderContext } from './../../definitions';
import { BuilderResult, CompilerResult } from './definitions';

export abstract class Compiler {
  constructor(public readonly file: string) { }

  public abstract async compile(exportPath: string, context: IBuilderContext): Promise<CompilerResult>;
    
  public getExportFilePath(exportPath: string) {
    return getExportPath(this.file, exportPath);
  }

  public async build(exportPath: string, context: IBuilderContext) {
    const data = await this.compile(exportPath, context);
    fs.writeFileSync(this.getExportFilePath(exportPath), data.output);
    return { ...data } as BuilderResult;
  }

  public async getContextFiles(exportPath: string, context: IBuilderContext): Promise<string[]> {
    return [
      this.file,
      ...(await this.build(exportPath, context)).affectedFiles
    ];
  }

}

export abstract class AutoDiscoverCompiler extends Compiler {
  public abstract readonly discoverExpression: RegExp;
  public abstract readonly removeExpression: RegExp;

  public getFileNameFromExternal(line: string) {
    return line.replace(this.removeExpression, '');
  }

  public discoverExternals(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8');
    let files = content.match(this.discoverExpression)?.map(v => (
      path.resolve(path.dirname(filePath), this.getFileNameFromExternal(v))
    )) || [];
    if (files.length > 0) {
      [ ...files ].forEach(file => {
        files = [
          ...files,
          ...this.discoverExternals(file)
        ];
      });
    }
    return files.filter(function(item, pos, a) {
      return a.indexOf(item) == pos;
    });
  }
}
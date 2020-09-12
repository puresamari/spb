import fs from 'fs';
import path from 'path';
import { getExportPath } from '../utils';

import { IBuilderContext } from './../../definitions';
import { BuilderResult, CompilerResult } from './definitions';

export abstract class Compiler {
  constructor(public readonly file: string) { }

  public abstract compile(exportPath: string, context: IBuilderContext): Promise<CompilerResult>;
    
  public getExportFilePath(exportPath: string, context: IBuilderContext) {
    return getExportPath(this.file, exportPath, context);
  }

  public async build(exportPath: string, context: IBuilderContext) {
    const data = await this.compile(exportPath, context);
    const exportFilePath = this.getExportFilePath(exportPath, context);
    if (!fs.existsSync(path.dirname(exportFilePath))) {
      fs.mkdirSync(path.dirname(exportFilePath), { recursive: true });
    }
    fs.writeFileSync(exportFilePath, data.output);
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
import fs from 'fs';
import { getExportPath } from '../utils';

import { IBuilderContext } from './../../definitions';
import { BuilderResult, CompilerResult } from './definitions';

export abstract class Compiler {
  constructor(public readonly file: string) { }

  public abstract async compile(exportPath: string, context: IBuilderContext): Promise<CompilerResult>;
    
  public async build(exportPath: string, context: IBuilderContext) {
    const data = await this.compile(exportPath, context);
    fs.writeFileSync(getExportPath(this.file, exportPath), data.output);
    return { ...data } as BuilderResult;
  }
    
  public async getContextFiles( exportPath: string, context: IBuilderContext): Promise<string[]> {
    return [this.file];
  }

}
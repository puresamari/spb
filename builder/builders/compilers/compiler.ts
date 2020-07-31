import fs from 'fs';

import { IBuilderContext } from './../../definitions';
import { ExportType } from './../utils';
import { BuilderResult, CompilerResult } from './definitions';

export abstract class Compiler {
  constructor() { }

  public abstract async compile(file: string, exportPath: string, context: IBuilderContext): Promise<CompilerResult>;
    
  public async build(file: string, exportPath: string, context: IBuilderContext) {
    const data = await this.compile(file, exportPath, context);
    fs.writeFileSync(exportPath, data.output);
    return { ...data } as BuilderResult;
  }
    
  public abstract async getContextFiles(file: string, exportPath: string, context: IBuilderContext): Promise<string[]>;

}
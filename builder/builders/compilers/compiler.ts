import fs from 'fs';

import { IBuilderContext } from './../../definitions';
import { ExportType } from './../utils';

export abstract class Compiler {
  constructor() { }

  public abstract async compile(file: string, exportPath: string, context: IBuilderContext):
    Promise<{ output: string; file: string, path: string, type: ExportType, affectedFiles: string[] }>;
    
  public async build(file: string, exportPath: string, context: IBuilderContext):
    Promise<{ path: string, type: ExportType, affectedFiles: string[] }> {
    const data = await this.compile(file, exportPath, context);
    fs.writeFileSync(exportPath, data.output);
    return { ...data };
  }
    
  public abstract async getContextFiles(file: string, exportPath: string, context: IBuilderContext): Promise<string[]>;

}
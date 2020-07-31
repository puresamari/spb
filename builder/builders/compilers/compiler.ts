import { IBuilderContext } from './../../definitions';
import { ExportType } from './../utils';

export abstract class Compiler {
  constructor() { }

  public abstract async compile(file: string, exportPath: string, context: IBuilderContext):
    Promise<{ path: string, type: ExportType, affectedFiles: string[] }>;

  public abstract async getContextFiles(file: string, exportPath: string, context: IBuilderContext): Promise<string[]>;

}
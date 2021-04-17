import fs from 'fs';
import { uniq } from 'lodash';
import path from 'path';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { getExportPath } from '../utils';

import { IBuilderContext } from './../../definitions';
import { BuilderResult, CompilerResult } from './definitions';

export abstract class Compiler {
  private readonly contextFileBehaviour: BehaviorSubject<string[]>;

  constructor(public readonly file: string) {
    this.contextFileBehaviour = new BehaviorSubject<string[]>([file]);
  }

  // IMPORTANT: Execute postCompile after compilation within the compile method!
  public abstract compile(exportPath: string, context: IBuilderContext): Promise<CompilerResult>;
  public postCompile(result: CompilerResult, contextFiles?: string[]): CompilerResult {
    this.contextFileBehaviour.next(uniq(contextFiles || [ this.file, ...result.affectedFiles ]));
    return result;
  }
    
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

  public get ContextFiles(): Observable<string[]> {
    return this.contextFileBehaviour.asObservable().pipe(
      distinctUntilChanged((before, after) => JSON.stringify(before) === JSON.stringify(after)),
      filter(v => v.length !== 0)
    );
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
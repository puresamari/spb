import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CompilerResult } from './../../builder/builders/compilers/definitions';
import { IBuilderOptions } from './../../builder/definitions/builder-options';


export enum CompilationStatus {
  Compiling,
  Compiled
}

export interface IDynamicCompilerResult extends CompilerResult {
  compilationStatus: CompilationStatus;
  changeAmount: number;
}

export class CompilationMap extends BehaviorSubject<Map<string, IDynamicCompilerResult>> {

  constructor(public readonly options: IBuilderOptions, data?: Map<string, IDynamicCompilerResult>) {
    super(data || new Map<string, IDynamicCompilerResult>());
  }

  get SimpleResultMap() {
    return this.pipe(
      map(v => {
        return v as Map<string, CompilerResult>;
      })
    )
  }

  patchFile(file: string, result: IDynamicCompilerResult) {
    const d = this.getValue();
    d.set(file, result);
    this.next(d);
  }

  patchAll(cb: (result: IDynamicCompilerResult, file?: string) => IDynamicCompilerResult) {
    const d = this.getValue();
    d.forEach((v,k) => d.set(k, cb(v, k)));
    this.next(d);
  }

  setCompilingState(compilationStatus: CompilationStatus, file?: string, result?: IDynamicCompilerResult) {
    if (result && file) {
      this.patchFile(file, {
        ...result,
        compilationStatus
      });
    }
  }

  changeFile(file: string, setCompiling = true) {
    const res = this.getValue().get(file);
    if (!res) { return; }
    this.patchFile(file, {
      ...res,
      changeAmount: res.changeAmount + 1,
      compilationStatus: setCompiling ? CompilationStatus.Compiling : res.compilationStatus
    })
  }

}
import { CompilerResult } from './../../../builder/builders/compilers/definitions';
import { IDynamicCompilerResult } from './../compilation-map';

export class FilesMap extends Map<string, CompilerResult> {
  
  // TODO: Could definetly be smarter
  resolve(element: string): CompilerResult | undefined {
    if (this.get(element)) { return this.get(element); }
    if (this.get(element + '.html')) { return this.get(element + '.html'); }
    if (this.get(element + 'index.html')) { return this.get(element + 'index.html'); }
  }

  has(element: string) {
    return !!this.resolve(element);
  }

  static fromDynamic(data: Map<string, IDynamicCompilerResult>): FilesMap {
    const map = new FilesMap();
    [...data.keys()].forEach(file => { map.set(file, data.get(file)! )});
    return map;
  }
}
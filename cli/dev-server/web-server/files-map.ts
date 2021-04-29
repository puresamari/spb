import { CompilerResult } from '@puresamari/spb-core/lib/builders/compilers/definitions';
import path from 'path';

import { IDynamicCompilerResult } from './../compilation-map';

export class FilesMap extends Map<string, CompilerResult> {
  
  // TODO: Could definetly be smarter
  resolve(element: string = ''): CompilerResult | undefined {
    const n = this.resolveName(element);
    if (n) { return this.get(n); }
  }

  resolveName(element: string = ''): string | undefined {
    if (super.has(element)) { return element; }
    if (!path.extname(element)) {
      if (super.has(element + '.html')) { return element + '.html'; }
      if (super.has(element + 'index.html')) { return element + 'index.html'; }
    }
  }

  has(element: string = '') {
    return !!this.resolveName(element);
  }

  static fromDynamic(data: Map<string, IDynamicCompilerResult>): FilesMap {
    const map = new FilesMap();
    [...data.keys()].forEach(file => { map.set(file, data.get(file)! )});
    return map;
  }
}
import { CompileCSS } from './compile-css';
import { CompileTS } from './compile-ts';
import { CompileTWIG } from './compile-twig';
import { getFileType } from './utils';


export async function buildFile(file: string, output: string) {
  switch (getFileType(file)) {
    case 'ts':
      return await CompileTS(file, output);
    case 'css':
      return await CompileCSS(file, output);
    case 'twig':
      return await CompileTWIG(file, output);
  }
}
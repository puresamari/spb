import { Compile } from './compilers/index';

import { getFileType } from './utils';

export async function buildFile(file: string, output: string) {
  return await Compile(getFileType(file) as any, file, output);
}
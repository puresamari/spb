import { IBuilderContext } from './../utils';
import { Compile } from './compilers';
import { getExportPath, getFileType } from './utils';

export async function buildFile(file: string, outDir: string, context: IBuilderContext) {
  return await Compile(getFileType(file) as any, file, getExportPath(file, outDir), context);
}
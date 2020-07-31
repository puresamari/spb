import { IBuilderContext } from './../utils';
import { Build, Compile, getContextFiles as getContextFilesTest } from './compilers';
import { getExportPath, getFileType } from './utils';

export async function getContextFiles(file: string, outDir: string, context: IBuilderContext) {
  return await getContextFilesTest(getFileType(file) as any, file, getExportPath(file, outDir), context);
}

export async function compileFile(file: string, outDir: string, context: IBuilderContext) {
  return await Compile(getFileType(file) as any, file, getExportPath(file, outDir), context);
}

export async function buildFile(file: string, outDir: string, context: IBuilderContext) {
  return await Build(getFileType(file) as any, file, getExportPath(file, outDir), context);
}
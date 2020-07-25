import { IBuilderContext } from './../../utils';
import { ExportType } from './../utils';
import { CompileCSS } from './css';
import { CompileTWIG } from './twig';
import { CompileTS } from './typescript';

export type Compile = (file: string, output: string, context: IBuilderContext) => Promise<{ path: string, type: ExportType }>;

const CompilerMapping : {
  [key: string]: Compile
} = {
  ts: CompileTS,
  css: CompileCSS,
  twig: CompileTWIG
}

// TODO: dynamically generate the union type based on mapping keys
export type CompielableType = 'ts' | 'css' | 'twig';

export async function Compile(type: CompielableType, file: string, exportPath: string, context: IBuilderContext) {
  return await CompilerMapping[type](file, exportPath, context);
}

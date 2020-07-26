import { IBuilderContext } from './../../utils';
import { Compiler } from './compiler';
import { CSSCompiler } from './css';
import { TWIGCompiler } from './twig';
import { TSCompiler } from './typescript';

const CompilerMapping : {
  [key: string]: Compiler
} = {
  ts: new TSCompiler(),
  css: new CSSCompiler(),
  twig: new TWIGCompiler()
}

// TODO: dynamically generate the union type based on mapping keys
export type CompielableType = 'ts' | 'css' | 'twig';

export async function Compile(type: CompielableType, file: string, exportPath: string, context: IBuilderContext) {
  return CompilerMapping[type].compile(file, exportPath, context);
}

export function getContextFiles(type: CompielableType, file: string, exportPath: string, context: IBuilderContext) {
  return CompilerMapping[type].getContextFiles(file, exportPath, context);
}
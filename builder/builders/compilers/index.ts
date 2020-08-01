import path from 'path';
import { Compiler } from './compiler';
import { CSSCompiler } from './css';
import PUGCompiler from './pug';
import { TWIGCompiler } from './twig';
import TSCompiler from './typescript';

export type CompielableType = 'ts' | 'css' | 'twig' | 'pug';

export const CompilerMapping : {
  [key in CompielableType]: new(file: string) => Compiler
} = {
  ts: TSCompiler,
  css: CSSCompiler,
  pug: PUGCompiler,
  twig: TWIGCompiler
}

export function getCompiler(file: string) {
  const type = path.extname(file).slice(1) as CompielableType;
  return new (CompilerMapping[type])(file);
}
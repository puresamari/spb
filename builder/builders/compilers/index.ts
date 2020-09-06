import path from 'path';

import { Compiler } from './compiler';
import CopyCompiler from './copy';
import { CSSCompiler } from './css';
import JSCompiler from './js';
import PUGCompiler from './pug';
import { SCSSCompiler } from './scss';
import { TWIGCompiler } from './twig';
import TSCompiler from './typescript';

export type CompielableType = 'ts' | 'css' | 'scss' | 'js' | 'twig' | 'pug';

export const CompilerMapping : {
  [key in CompielableType]: new(file: string) => Compiler
} = {
  ts: TSCompiler,
  js: JSCompiler,
  css: CSSCompiler,
  scss: SCSSCompiler,
  pug: PUGCompiler,
  twig: TWIGCompiler
}

export function getCompiler(file: string): Compiler | null {
  const type = path.extname(file).slice(1) as CompielableType;
  if (!CompilerMapping[type]) { return new CopyCompiler(file); }
  return new (CompilerMapping[type])(file);
}
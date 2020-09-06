import { ExportType } from '../utils';

export interface BuilderResult {
  path: string;
  type: ExportType;
  affectedFiles: string[];
}

export interface CompilerResult extends BuilderResult {
  output: string | Buffer;
  file: string;
}
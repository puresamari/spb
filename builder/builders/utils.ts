import path, { dirname } from 'path';

import { IBuilderContextSimple } from './../definitions';

export type ExportType = 'js' | 'css' | 'html' | 'svg' | 'png' | 'jpg';

export function getFileType(file: string): string | null {
  return path.extname(file).replace('.', '');
}

export function getExportType(file: string): ExportType | null {
  const type = getFileType(file);
  switch (type) {
    case 'scss':
      return 'css';
    case 'ts':
      return 'js';
    case 'twig':
    case 'pug':
      return 'html';
    default:
      return type as any;
  }
}

export function getFileName(file: string, context: IBuilderContextSimple): string {
  return file.split('/')[file.split('/').length - 1];
}

export function getExportFileName(file: string, context: IBuilderContextSimple): string {
  return file.replace('.' + getFileType(file), '.' + getExportType(file));
}

export function getExportPath(file: string, outDir: string, context: IBuilderContextSimple): string {
  const fileName = path.relative(context.basePath, file);
  return path.join(outDir, getExportFileName(fileName, context));
}
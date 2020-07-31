import * as path from 'path';

export type ExportType = 'js' | 'css' | 'html';

export function getFileType(file: string) {
  return file.split('.')[file.split('.').length - 1] as string;
}

export function getExportType(file: string): ExportType {
  const type = getFileType(file);
  switch (type) {
    case 'ts':
      return 'js';
    case 'twig':
    case 'pug':
      return 'html';
    default:
      return type as any;
  }
}

export function getFileName(file: string): string {
  return file.split('/')[file.split('/').length - 1];
}

export function getExportFileName(file: string): string {
  const fileName = getFileName(file);
  return fileName.replace('.' + getFileType(fileName), '.' + getExportType(fileName));
}

export function getExportPath(file: string, outDir: string): string {
  const fileName = getFileName(file);
  return path.join(outDir, getExportFileName(fileName));
}
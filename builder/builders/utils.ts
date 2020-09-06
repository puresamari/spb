import path from 'path';

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
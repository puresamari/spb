export type ExportType = 'js' | 'css' | 'html';

export function getFileType(file: string): 'ts' | 'css' | 'twig' {
  return file.split('.')[file.split('.').length - 1] as any;
}

export function getExportType(file: string): ExportType {
  const type = getFileType(file);
  switch (type) {
    case 'ts':
      return 'js';
    case 'twig':
      return 'html';
    default:
      return type as any;
  }
}

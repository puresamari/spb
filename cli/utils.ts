import path from 'path';

export const version = '0.0.1';

export const basePath = process.cwd();

export function resolveFilePath(file: string) {
  return path.resolve(basePath, file);
}

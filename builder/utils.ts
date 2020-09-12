import { IBuilderContext } from './definitions';
export * from './definitions';

export function NormalizeContextForBuildContext(context: IBuilderContext): IBuilderContext {
  return {
    ...context,
    stylesheets: context.stylesheets.map(v => v.replace(context.basePath, '')),
    scripts: context.scripts.map(v => v.replace(context.basePath, ''))
  }
}
import { IBuilderOptions } from './builder-options';

export interface IBuilderContextSimple {
  options: IBuilderOptions;
  basePath: string;
}

export interface IBuilderContext extends IBuilderContextSimple {
  stylesheets: string[];
  scripts: string[];
  html: string[];
  other: string[];
}

export { IBuilderOptions };
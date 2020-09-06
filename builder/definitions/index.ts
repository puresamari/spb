import { IBuilderOptions } from './builder-options';

export interface IBuilderContext {
  stylesheets: string[];
  scripts: string[];
  html: string[];
  other: string[];
  options: IBuilderOptions;
}

export { IBuilderOptions };
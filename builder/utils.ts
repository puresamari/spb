export interface IBuilderOptions {
  output: string,
  files: string[];
}

export interface IBuilderContext {
  stylesheets: string[];
  scripts: string[];
  html: string[];
}
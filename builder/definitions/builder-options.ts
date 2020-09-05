export interface IBuilderOptions {
  output: string;
  files: string[];
  compilers?: {
    postcss?: {
      plugins?: string[]
    }
  },
  postBuild?: string;
}
export interface IBuilderOptions {
  output: string;

  /**
   * Root path relative to path or config path. Default is ''.
   */
  root?: string;

  /**
   * Files that should be built (relative to root).
   */
  files: string[];
  compilers?: {
    postcss?: {
      plugins?: string[]
    }
  },

  /**
   * A script that will be ran after the build has finished.
   */
  postBuild?: string;
  
  /**
   * Determains whether the output folder should be cleared.
   *
   * @default true
   */
  clearOutputFolder?: boolean; // default is true
}
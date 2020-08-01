import { TypescriptBundler } from '@puresamari/ts-bundler';
import { IBuilderContext } from '../../utils';
import { ExportType } from '../utils';
import { Compiler } from './compiler';

export default class TypescriptCompiler extends Compiler {

  private readonly bundler: TypescriptBundler;

  constructor(public readonly file: string) {
    super(file);
    this.bundler = new TypescriptBundler(this.file);
  }

  public async compile(
    exportPath: string,
    context: IBuilderContext
  ) {
    const exportedPath = exportPath;
    const result = await this.bundler.bundle();

    return {
      output: result.output,
      file: this.file,
      path: exportedPath,
      type: 'js' as ExportType,
      affectedFiles: []
    };
  }

  public async getContextFiles(
    exportPath: string,
    context: IBuilderContext
  ): Promise<string[]> {
    const bundler = new TypescriptBundler(this.file);
    const result = await bundler.bundle();
    return [
      this.file,
      ...result.modules.filter((v: any) => !v.node_module).map((v: any) => v)
    ].filter(v => !!v);
  }
}

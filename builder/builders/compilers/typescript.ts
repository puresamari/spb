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

    return this.postCompile({
      output: result.output,
      file: this.file,
      path: exportedPath,
      type: 'js' as ExportType,
      affectedFiles: []
    }, [
      ...result.modules.filter((v: any) => !v.node_module).map((v) => v.file as { file: string, nodeModule: boolean })
    ].filter(v => !!v && !v.nodeModule).map(v => v.file));
  }
}
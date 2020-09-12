import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { from, Subscription, timer } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';

import { Builder } from '../../builder';
import { ExportType } from '../../builder/builders/utils';
import { IBuilderOptions } from '../../builder/definitions/builder-options';
import { IMainCommanderOptions, resolveFilePath } from '../utils';
import { CompilationMap, CompilationStatus } from './compilation-map';
import { WebServer } from './web-server';

const log = console.log;

export class DevServer {

  private readonly builder: Builder;
  public readonly webSever?: WebServer;

  private watcherSub?: Subscription;

  private watchers: fs.FSWatcher[] = [];

  private readonly files: CompilationMap;

  constructor(
    commander: IMainCommanderOptions,
    public readonly options: IBuilderOptions,
    public readonly devServerOptions = {
      port: 5678,
      socketPort: 5679
    }
  ) {
    this.builder = new Builder(options, path.dirname(resolveFilePath(commander.config)));

    this.files = new CompilationMap(options);

    this.webSever = new WebServer(options, this.Files, devServerOptions);

    this.start();
  }
  public get Files() {
    return this.files.asObservable(); 
  }
  
  private async compileFile(file: string) {
    const exportPath = this.builder.getExportPathOfFile(file);
    if (!exportPath) { return; }
    const eFile = path.relative(this.builder.options.output, exportPath);

    this.files.changeFile(eFile);
    
    const result = (await this.builder.compile(
      async (localFile: { path: string; type: ExportType; affectedFiles: string[]; }) =>
        new Promise<void>(resolve => { console.log('compiled', file); resolve() }),
      [file]
    ))[0];

    const fileOutput = this.files.getValue().get(eFile);
    if (fileOutput) {
      this.files.patchFile(eFile, {
        ...fileOutput,
        output: this.webSever?.processFile(result).output || result.output,
        compilationStatus: CompilationStatus.Compiled,
        changeAmount: fileOutput.changeAmount
      });
    } else {
      this.files.patchFile(eFile, {
        ...result,
        output: this.webSever?.processFile(result).output || result.output,
        compilationStatus: CompilationStatus.Compiled,
        changeAmount: 1
      });
    }
  }

  // TODO: Somehow make the builder push changes rather than checking for them.
  public getWatchingFilesObservable() {
    let files: { source: string; files: string[]; }[] = [];
    return timer(0, 2000).pipe(
      mergeMap(() => from(this.builder.getContextFiles())),
      filter(v => JSON.stringify(v) !== JSON.stringify(files)),
      tap(v => files = v)
    )
  }

  public async getWatchingFiles() {
    return await this.builder.getContextFiles()
  }

  private async start() {
    this.watcherSub = this.getWatchingFilesObservable().subscribe(async contextFiles =>{
      
      // const contextFiles = this.getWatchingFiles();
        
      log('Watching files');
      contextFiles.map(v => v.files.map(file => chalk.underline.blue(file)).join('\n  ')).forEach(v => log('  ' + v));
      log('');

      this.watchers.forEach(watcher => {
        watcher.close();
      })
  
      await contextFiles.forEach(async context => {
        [ ...context.files ].forEach(file => {
          this.watchers.push(fs.watchFile(file, (curr: any, prev: any) => {
            this.compileFile(context.source);
          }) as any);
        });
        await this.compileFile(context.source);
      });

    })
    

  }
  

  public async destroy() {
    this.watcherSub?.unsubscribe();
    return this.webSever!.destroy();
  }

}
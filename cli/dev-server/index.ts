import chalk from 'chalk';
import fs, { watch } from 'fs';
import path from 'path';
import { BehaviorSubject, timer, of, from, Subscription } from 'rxjs';
import { mergeMap, filter, tap } from 'rxjs/operators';

import { Builder } from '../../builder';
import { CompilerResult } from '../../builder/builders/compilers/definitions';
import { ExportType } from '../../builder/builders/utils';
import { IBuilderOptions } from '../../builder/definitions/builder-options';
import { WebServer } from './web-server';

const log = console.log;

export class DevServer {

  private readonly builder: Builder;
  public readonly webSever?: WebServer;

  private watcherSub?: Subscription;

  constructor(
    public readonly options: IBuilderOptions,
    public readonly devServerOptions = {
      port: 5678,
      socketPort: 5679
    }
  ) {
    this.builder = new Builder(options);

    this.webSever = new WebServer(options, this.files.asObservable(), devServerOptions);

    this.start();
  }

  private watchers: fs.FSWatcher[] = [];

  private files = new BehaviorSubject(new Map<string, CompilerResult>());
  
  private async compileFile(file: string) {
    const exportPath = this.builder.getExportPathOfFile(file);
    if (!exportPath) { return; }

    const files = this.files.getValue();

    const results = await this.builder.compile(
      async (localFile: { path: string; type: ExportType; affectedFiles: string[]; }) =>
        new Promise<void>(resolve => { console.log('compiled', file); resolve() }),
      [file]
    );

    results.forEach((file) => {
      const { output } = this.webSever!.processFile(file);
      files.set(path.relative(this.builder.options.output, exportPath), {
        ...file,
        output
      });
    });

    this.files.next(files);
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
          this.watchers.push(fs.watch(file, () => {
            this.compileFile(context.source);
          }));
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
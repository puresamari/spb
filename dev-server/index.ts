import path from 'path';
import http from 'http';
import fs from 'fs';
import chalk from 'chalk';

import { Builder } from '../builder';
import { CompilerResult } from './../builder/builders/compilers/definitions';
import { ExportType } from './../builder/builders/utils';
import { IBuilderOptions } from './../builder/definitions/builder-options';

const log = console.log;

export class DevServer {

  private readonly builder: Builder;

  constructor(
    public readonly options: IBuilderOptions,
    private readonly devServerOptions = {
      port: 5678,
      socketPort: 5679
    }
  ) {
    this.builder = new Builder(options);

    this.start();
  }

  private files = new Map<string, CompilerResult>();

  private async compileFile(file: string) {
    const results = await this.builder.compile(
      async (file: { path: string; type: ExportType; affectedFiles: string[]; }) =>
        new Promise<void>(resolve => { console.log('compiled', file.path); resolve() }),
      [file]
    );

    results.forEach(v => {
      this.files.set(path.relative(this.builder.options.output, v.path), v);
    });
  }

  private async start() {
    const contextFiles = await this.builder.getContextFiles();
      
    log('Watching files');
    contextFiles.map(v => v.files.map(file => chalk.underline.blue(file)).join('\n  ')).forEach(v => log('  ' + v));
    log('');

    await contextFiles.forEach(async context => {
      [ ...context.files ].forEach(file => {
        fs.watchFile(file, (curr, prev) => {
          // build(builder, progressBar, file);
          this.compileFile(file);
        });
      });
      await this.compileFile(context.source);
    });

    
    const server = http.createServer((req, res) => {
      if (!req.url || !this.files.has(req.url.slice(1))) {
        res.writeHead(404);
        res.end(`
<h1>The requested resource (${(req.url || '/unknown').slice(1)}) is not available</h1>
<h3>These files are available</h3>
<ul>
  ${[...this.files.keys()].map(file => `<li><a href="${file}">${file}</a></li>`).join('\n')}
</ul>
`);
        return;
      }

      const requestedFile = this.files.get(req.url.slice(1))!;

      res.writeHead(200);
      res.end(requestedFile.output);
    });

    server.listen(this.devServerOptions.port);

    log(`\nStarded development server on ${chalk.blue(`http://localhost:${this.devServerOptions.port}/`)}\n`)

  }

}
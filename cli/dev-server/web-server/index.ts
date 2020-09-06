import { FilesMap } from './files-map';
import chalk from 'chalk';
import http, { OutgoingHttpHeaders } from 'http';
import path from 'path';
import fs from 'fs';
import pug from 'pug';
import { from, Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import WebSocket from 'ws';

import { CompilerResult } from '../../../builder/builders/compilers/definitions';
import { IBuilderOptions } from '../../../builder/definitions/builder-options';
import { IDynamicCompilerResult } from './../compilation-map';

const log = console.log;

export class WebServer {

  private readonly templates = {
    reload: pug.compile(fs.readFileSync(path.resolve(__dirname, 'templates/reload.pug'), 'utf-8') ),
    404: pug.compile(fs.readFileSync(path.resolve(__dirname, 'templates/404.pug'), 'utf-8') ),
  }

  public webserver?: http.Server;
  public websocket?: WebSocket.Server;

  private filesSub?: Subscription;
  private statusSub?: Subscription;

  public get ServerURL() { return `http://localhost:${this.devServerOptions.port}`; }
  public get WebSocketURL() { return `ws://localhost:${this.devServerOptions.socketPort}`; }

  private files?: FilesMap;

  public processFile({ output, ...v }: CompilerResult): CompilerResult {

    if (v.type === 'html') {
      output += this.templates.reload({ websocketUrl: this.WebSocketURL });
      // output += fs.readFileSync(path.resolve(__dirname, 'reload.html'), 'utf-8').replace('__WEBSOCKET_URL__', this.WebSocketURL);
    }
    
    return {...v, output};
  }

  public getHeaders({ type }: CompilerResult): OutgoingHttpHeaders | undefined {
    switch (type) {
      case 'svg':
        return {'content-type':'image/svg+xml'};
      case 'png':
      case 'jpg':
        return {'content-type':'image/' + type};
      default:
        return undefined;
    }
  }

  constructor(
    public readonly options: IBuilderOptions,
    readonly filesObservable: Observable<Map<string, IDynamicCompilerResult>>,
    public readonly devServerOptions = {
      port: 5678,
      socketPort: 5679
    },
  ) {

    this.filesSub = filesObservable.subscribe(v => {
      this.files = FilesMap.fromDynamic(v);
    });
    
    let statusBefore: 'compiling' | 'reload' | null = null;
    this.statusSub = filesObservable.pipe(
      map(v => [...v.values()].find(e => e.compilationStatus === 0) ? 'compiling' : 'reload'),
      filter(v => v !== statusBefore),
      tap(v => statusBefore = v),
      filter(v => !!v),
    ).subscribe(v => {
      if (v) {
        this.send(v);
      }
    })
    
    this.webserver = http.createServer((req, res) => {
      
      if (!req.url || !this.files || !this.files.has(req.url.slice(1))) {
        res.writeHead(404);
        res.end(this.templates[404]({
          url: req.url,
          requested_file: (req.url || '/unknown').slice(1),
          files: [...this.files?.keys() || []]
        }));
        return;
      }

      const requestedFile = this.files.resolve(req.url.slice(1))!;

      res.writeHead(200, this.getHeaders(requestedFile));
      res.end(requestedFile.output);
    });

    this.webserver.listen(this.devServerOptions.port);
    
    this.websocket = new WebSocket.Server({ port: this.devServerOptions.socketPort });
    
    let index = 0;
    this.websocket.on('connection', (ws) => {
      index += 1;
      this.sockets.set('' + index, ws);
      ws.on('close', () => {
        this.sockets.delete('' + index);
      });
    });

    log(`
Starded development servers 
  http: ${chalk.blue(this.ServerURL)}
  ws:   ${chalk.blue(this.WebSocketURL)}
`);
  }

  private sockets = new Map<string, WebSocket>();

  private async send(message: string) {
    [ ...this.sockets.values() ].forEach(socket => socket.send(message));
  }


  public async destroy() {

    this.filesSub?.unsubscribe();
    this.statusSub?.unsubscribe();

    let closed: { [key: string]: boolean } = {};

    if (this.webserver) { closed['webserver'] = false; }
    if (this.websocket) { closed['websocket'] = false; }

    const promi = new Promise(resolve => {
      const check = () => {
        if (Object.values(closed).filter(v => !!v).length === 0) { resolve(); }
      }

      if (this.webserver) {
        this.webserver?.close(() => {
          closed['webserver'] = true;
          check();
        });
      }

      if (this.websocket) {
        this.websocket?.close(() => {
          closed['websocket'] = true;
          check();
        });
      }

      check();
    });


    return from(promi).pipe();
  }
}
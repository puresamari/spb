import chalk from 'chalk';
import http from 'http';
import pug from 'pug';
import path from 'path';
import { from, Observable } from 'rxjs';
import WebSocket from 'ws';

import { CompilerResult } from '../../../builder/builders/compilers/definitions';
import { IBuilderOptions } from '../../../builder/definitions/builder-options';

const log = console.log;

export class WebServer {

  private readonly templates = {
    reload: pug.compileFile(path.resolve(__dirname, 'templates/reload.pug') ),
    404: pug.compileFile(path.resolve(__dirname, 'templates/404.pug') ),
  }

  public webserver?: http.Server;
  public websocket?: WebSocket.Server;

  public get ServerURL() { return `http://localhost:${this.devServerOptions.port}`; }
  public get WebSocketURL() { return `ws://localhost:${this.devServerOptions.socketPort}`; }

  private files?: Map<string, CompilerResult>;

  public processFile({ output, ...v }: CompilerResult): CompilerResult {

    if (v.type === 'html') {
      output += this.templates.reload({ websocketUrl: this.WebSocketURL });
      // output += fs.readFileSync(path.resolve(__dirname, 'reload.html'), 'utf-8').replace('__WEBSOCKET_URL__', this.WebSocketURL);
    }
    
    return {...v, output};
  }

  constructor(
    public readonly options: IBuilderOptions,
    private readonly filesObservable: Observable<Map<string, CompilerResult>>,
    public readonly devServerOptions = {
      port: 5678,
      socketPort: 5679
    },
  ) {

    filesObservable.subscribe(v => {
      this.files = v;
    });
    
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

      const requestedFile = this.files.get(req.url.slice(1))!;

      res.writeHead(200);
      res.end(requestedFile.output);
    });

    this.webserver.listen(this.devServerOptions.port);
    // var net = require("net");

    // function createSocket(socket = new net.Socket(options)){
    // }
    // var s = new net.Socket({ });
    // s.write("hello!");

    // exports.createSocket = createSocket;
 
    this.websocket = new WebSocket.Server({ port: this.devServerOptions.socketPort });
    
    let index = 0;
    this.websocket.on('connection', (ws) => {
      index += 1;
      this.sockets.set('' + index, ws);
      ws.on('close', () => {
        this.sockets.delete('' + index);
      });
    });

    // var s = new net.Socket();

    // s.on("data", function(data) {
    //   console.log("data received:", data);
    // });
    // s.connect(this.devServerOptions.socketPort, function(){
    //   s.write("hello!");
    // });

    log(`
Starded development servers 
  http: ${chalk.blue(this.ServerURL)}
  ws:   ${chalk.blue(this.WebSocketURL)}
`);
  }

  private sockets = new Map<string, WebSocket>();

  private async reload() {
    [ ...this.sockets.values() ].forEach(socket => socket.send('reload'));
  }


  public async destroy() {

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
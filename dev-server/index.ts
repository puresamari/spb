import path from 'path';
import net from 'net';
import http from 'http';
import fs from 'fs';
import chalk from 'chalk';
import WebSocket from 'ws';

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

  private sockets = new Map<string, WebSocket>();

  private async reload() {
    [ ...this.sockets.values() ].forEach(socket => socket.send('reload'));
  }

  private async compileFile(file: string) {
    const results = await this.builder.compile(
      async (file: { path: string; type: ExportType; affectedFiles: string[]; }) =>
        new Promise<void>(resolve => { console.log('compiled', file.path); resolve() }),
      [file]
    );

    results.forEach(({ output, ...v }) => {
      if (v.type === 'html') {
        output += `
<script type="text/javascript">
  var connection = new WebSocket('ws://localhost:${this.devServerOptions.socketPort}');

  /* connection.addEventListener('reload', function incoming(message) {
    alert('please reload');
  }); */

  connection.addEventListener('message', function (event) {
    switch (event.data) {
      case 'reload':
        window.location.href = window.location.href;
        return;
      default:
        console.log('unknown event', event);
    }
  });
</script>
`;
      }
      this.files.set(path.relative(this.builder.options.output, v.path), {
        ...v,
        output
      });
    });

    this.reload();
  }

  private async start() {
    const contextFiles = await this.builder.getContextFiles();
      
    log('Watching files');
    contextFiles.map(v => v.files.map(file => chalk.underline.blue(file)).join('\n  ')).forEach(v => log('  ' + v));
    log('');

    await contextFiles.forEach(async context => {
      [ ...context.files ].forEach(file => {
        fs.watchFile(file, (curr, prev) => {
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
    // var net = require("net");

    // function createSocket(socket = new net.Socket(options)){
    // }
    // var s = new net.Socket({ });
    // s.write("hello!");

    // exports.createSocket = createSocket;
 
    const wss = new WebSocket.Server({ port: this.devServerOptions.socketPort });
    
    let index = 0;
    wss.on('connection', (ws) => {
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
  http: ${chalk.blue(`http://localhost:${this.devServerOptions.port}/`)}
  ws:   ${chalk.blue(`ws://localhost:${this.devServerOptions.socketPort}/`)}
`);

  }

}
import {connection, server} from 'websocket';
import {SocketRouter} from './socketRouter';
const WebSocketServer = server;
//const authService = require('./authService');
//const dbService = require('./dbService');
const http = require('http');

class SocketRequest {
  public service:string;
  public endpoint:string;
  public params:any;

  constructor(rawData:string) {
    let obj = JSON.parse(rawData);

    /**
     * @type {string}
     * @description Service name.
     */
    this.service = obj.service;

    /**
     * @type {string}
     */
    this.endpoint = obj.endpoint;

    /**
     * @type {any}
     */
    this.params = obj.params;
  }
}

class SocketServer {
  public clients:Array<connection>
  public router: SocketRouter;

  constructor() {
    this.clients = [];
    this.router = new SocketRouter();

    const server = http.createServer((request, response) => {
      response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
      });
      console.log((new Date()) + ' Received request for ' + request.url);
      response.writeHead(404);
      response.end();
    });
    server.listen(4080, () => {
      console.log((new Date()) + ' Server is listening on port 4080');
    });

    const wsServer = new WebSocketServer({
      httpServer: server,
      autoAcceptConnections: false
    });

    wsServer.on('request', (request) => {
      if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
      }

      var connection = request.accept(null, request.origin);
      this.clients.push(connection);
      console.log((new Date()) + ' Connection accepted.');
      connection.on('message', (message) => {
        if (message.type === 'utf8') {
          console.log('Received Message: ' + message.utf8Data, 'clients -> ' + this.clients.length);
          //connection.sendUTF(message.utf8Data);
          let socketRequest = new SocketRequest(message.utf8Data);
          this.router.route(socketRequest.service, socketRequest.endpoint, connection, socketRequest.params);
          //this.clients.forEach(it => it.sendUTF(message.utf8Data))
        }
        else if (message.type === 'binary') {
          console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
          connection.sendBytes(message.binaryData);
        }
      });
      connection.on('close', (reasonCode, description) => {
        this.clients = this.clients.filter(it => it != connection);
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        this.router.closeConnection(connection);
      });
    });
  }
}

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

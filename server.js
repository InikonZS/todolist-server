const http = require('http');
const config = require('./serverConfig');
const util = require('util');

const router = require('./router');
const echoService = require('./services/echoService');
const testService = require('./services/testService');
const todoListService = require('./services/todoList/todoListService');
const authService = require('./authService');

const { SocketServer } = require('./socketService');

const app_port = process.env.app_port || 4040;
const app_host = process.env.app_host || '127.0.0.1';

const base = require('./dbService');
import { CellCoord } from './chess/chess-lib/cell-coord';

function paramsParser(paramsString) {
  let params = {};
  paramsString.split(/[&]+/).forEach((it) => {
    let entry = it.split('=');
    params[entry[0]] = entry[1];
  });
  return params;
}

class Server {
  constructor() {}

  response(res, val) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
    });

    res.write(val);
    res.end();
  }

  start() {
    http
      .createServer(async (req, res) => {
        let entry = req.url.split('?');
        let route = entry[0].slice(1);
        let params = paramsParser(entry[1] || '');
        try {
          let userData = null;
          console.log(params);
          if (params.sessionId) {
            userData = await authService.getUserBySessionId(params.sessionId);
            console.log(userData);
          }
          let result = await router.route(route, params, userData);
          this.response(res, JSON.stringify(result));
        } catch (err) {
          this.response(res, JSON.stringify(err));
        }
      })
      .listen(app_port);
  }
}

const server = new Server();
server.start();
base.start(config.localDatabaseURL);
echoService.start();
testService.start();
todoListService.start();
authService.start();

new SocketServer();

// CellCoord описана в TS файле. Ниже 2 строчки подтверждают, что TS компилируется и нормально интегрируется в JS проект.
const coords = new CellCoord(1, 3);
console.log(coords.toString());

console.log('Web server running at http://' + app_host + ':' + app_port);

//fetch('http://127.0.0.1:8080/parm?gdfx=54').then((res)=>res.json()).then(res=>console.log(res))

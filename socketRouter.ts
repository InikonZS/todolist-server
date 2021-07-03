import {ChatService} from './socketService'; 

export class SocketRouter {
  public services:any;

  constructor() {
    this.services = { chat: new ChatService() };
  }

  route(serviceName, endpointName, connection, params) {
    this.services[serviceName][endpointName](connection, params);
  }

  closeConnection(connection) {
    Object.keys(this.services).forEach(it => {
      this.services[it].closeConnection(connection);
    })
  }
}

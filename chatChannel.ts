const authService = require('./authService');
import { dbService } from './dbService';

interface IDatabaseUser {
  login: string;
  password: string;
  avatar: string;
}

interface IChatResponse {
  type: string;
}

class ChatUserData {
  public login: string;
  public avatar: string;
  public sessionId: string;

  constructor(sessionId: string, data: IDatabaseUser) {
    this.sessionId = sessionId;
    this.login = data.login;
    this.avatar = data.avatar;
  }
}

class ChatClient {
  public connection: any;
  public userData: ChatUserData;

  constructor(connection: any, userData: ChatUserData) {
    this.connection = connection;
    this.userData = userData;
  }

  send(response: IChatResponse){
    this.connection.sendUTF(JSON.stringify(response));
  }
}

class ChannelJoinUserResponse implements IChatResponse{
  public type:string;
  public userList: Array<string>;

  constructor(userList:Array<string>){
    this.type = 'userList';
    this.userList = [...userList];
  }
}

class ChannelSendMessageResponse implements IChatResponse{
  public type:string;
  public senderNick:string;
  public messageText:string;

  constructor(senderNick:string, messageText:string){
    this.type = 'message';
    this.senderNick = senderNick,
    this.messageText = messageText;
  }
}

export class ChatChannel {
  public name: string;
  public clients: Array<ChatClient>

  constructor(name: string) {
    this.name = name;
    this.clients = [];
  }

  private sendForAllClients(response: IChatResponse){
    this.clients.forEach(client => {
      client.send(response);
    });
  }

  joinUser(connection: any, params: any) {
    authService.getUserBySessionId(params.sessionId).then(sessionData => {
      return dbService.db.collection('users').findOne({ login: sessionData.login });
    }).then( (userData:IDatabaseUser) => {
      if (userData) {
        console.log(userData)
        this.clients.push(new ChatClient(connection, new ChatUserData(params.sessionId, userData)));
        this.sendForAllClients(new ChannelJoinUserResponse(this.clients.map(it => it.userData.login)));
      }
    });
  }

  leaveUser(connection, params) {
    this.clients = this.clients.filter(it => it.connection != connection);
    this.clients.forEach(it => {
      this.sendForAllClients(new ChannelJoinUserResponse(this.clients.map(it => it.userData.login)));
    });
  };

  sendMessage(connection, params) {
    const currentClient = this.clients.find(it => it.connection == connection);
    if (currentClient && currentClient.userData) {
      this.sendForAllClients(new ChannelSendMessageResponse(currentClient.userData.login, params.messageText));
    }
  }
}
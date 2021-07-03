const base64 = require('./utils/base64').encodeBase64;
const router = require('./router');
const database = require('./dbService');
const serviceName = 'authService';
const {regValidation} = require('./utils/regValidation')

class AuthService {

  getUserBySessionId(sessionId) {
    console.log(sessionId);
    return database.db.collection('sessions').findOne({ session: sessionId }, {}).then((res) => {
      console.log(res);
      return res;
    });
  }

  start() {

    this.addEndpoint('testAccess', (params, userData) => {
      return Promise.resolve({ params, userData });
    });

    this.addEndpoint('session', (params) => {
      console.log(params);
      return database.db.collection('sessions').findOne({ session: params.sessionHash }, {}).then((res) => {
        console.log(res)
        if (res && params.sessionHash) {
          return { status: 'ok' };
        } else {
          return { status: 'error' }
        }
      });
    });

    this.addEndpoint('auth', (params) => {
      console.log(`${params} auth`);
      const decodedLogin = decodeURI(`${params.login}`)
      return database.db.collection('users').findOne({ login: decodedLogin, password: params.password }, {}).then((res) => {
        if (res) {
          let sessionData = { login: decodedLogin, session: decodedLogin + (Math.random() * 1000).toFixed(0) };
          console.log(sessionData);
          console.log('auth res', res);
          return database.db.collection('sessions').insertOne(sessionData).then(() => {
            return { status: 'ok', session: sessionData.session, login: res.login, avatar: res.avatar };
          });
        } else {
          return { status: 'error' }
        }
      });
    });

    this.addEndpoint('register', (params) => {
      console.log('request register')
      const decodedLogin = decodeURI(`${params.login}`);
      if (regValidation(params) == 'ok') {
        console.log('register done')
        return database.db.collection('users').insertOne({ login: decodedLogin, password: params.password}).then(() => {
          return { status: 'ok' };
        });
      } else {
        console.log('register error')
        return { status: 'error' }
      }
    });

    this.addEndpoint('regValidation', (params) => {
      console.log(params);
      const decoded = decodeURI(`${params.login}`);
      return database.db.collection('users').findOne({ login: params.login }, {}).then((res) => {
        if (!res) {
          console.log(decoded)
          if (decoded.match(/^[a-zA-Z0-9а-яА-Я]+([._]?[a-zA-Z0-9а-яА-Я]+)*$/) && params.login.length >= 3) {
            console.log('ok')
            return { status: 'ok' };
          } else {
            console.log(`${decoded} -- error after validation`)
            return { status: 'error' };
          }
        } else {
          console.log('error user already exists')
          return { status: 'error' };
        }
      });
    });

    this.addEndpoint('authValidation', (params) => {
      console.log(params);
      const decodedLogin = decodeURI(`${params.login}`)
      return database.db.collection('users').findOne({ login: decodedLogin }, {}).then((res) => {
        if (res) {
          return { status: 'ok' };
        } else {
          return { status: 'error' };
        }
      });
    })
    this.addEndpoint('renameUser'), (params,newName) =>{
      const decodedName = decodeURI(params.login);
      const decodedNewName = decodeURI(newName);
      return database.db.collection('users').findOne({ login: decodedName }, {}).then((res) => {
        if (res) {
          return  database.db.collection('users').updateOne({login:decodedName},{$set : {login:decodedNewName}})
        } else {
          return { status: 'user not found' };
        }
      });
      
    }
    this.addEndpoint('passwordValidation', (params) => {
      if (params.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
        return { status: 'ok' };
      } else {
        return { status: 'error' };
      }
    })

  }

  addEndpoint(name, func) {
    router.addRoute(serviceName + '/' + name, func);
  }
}

module.exports = new AuthService();

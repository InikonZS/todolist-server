import {Db, MongoClient} from 'mongodb';

export class DatabaseService{
  public db: Db;

  constructor(){
    this.db = null;
  }

  start(url){
    let mongo = new MongoClient(url, {
      useNewUrlParser:true, 
      useUnifiedTopology:true
    });

    mongo.connect().then(()=>{
      this.db = mongo.db('chessmate');
      console.log('connected');
    });
  }
}

const _deService = new DatabaseService();

export const dbService = _deService;

module.exports = _deService
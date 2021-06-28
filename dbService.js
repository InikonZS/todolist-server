const {MongoClient} = require('mongodb');

class DatabaseService{
  
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

module.exports = new DatabaseService();
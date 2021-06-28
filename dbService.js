const {MongoClient} = require('mongodb');

class DatabaseService{
  
  constructor(){
    this.db = null;
  }

  async start(url){
    let mongo = new MongoClient(url, {
      useNewUrlParser:true, 
      useUnifiedTopology:true
    });

    await mongo.connect().then(()=>{
      this.db = mongo.db('chessmate');
      console.log('Database connected');
    });

    this.getChannels();
  }

  async getChannels(){    
    //database.db.collection('channels').findOne({ name: 'test' }, {}).then((res) => {console.log(res)}); 
    this.dbChannels = await this.db.collection('channels').find().toArray();      
}
}

module.exports = new DatabaseService();
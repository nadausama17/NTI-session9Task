const {MongoClient} = require('mongodb');
const URL = "mongodb://localhost:27017/"

const myConnection = (cb)=>{
    MongoClient.connect(URL,{},(err,client)=>{
        if(err) cb(err,false);
        const db = client.db('g21');
        cb(false,db);
    });
}

module.exports = myConnection;
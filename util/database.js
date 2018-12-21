const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://tahauygun:TestUserForShopify@cluster0-v8atw.mongodb.net/test?retryWrites=true')
    .then(client=>{
      console.log('connected');
      callback(client);
    })
    .catch(err=> {
      console.log(err);
    });
};

module.exports = mongoConnect;




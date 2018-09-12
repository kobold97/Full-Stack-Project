var findJsTiles = require('../dbhelper').findJsTiles;
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

{
    var url = 'mongodb://localhost:27017';
    var dbName = 'blog';
}

router.get('/', function(req, res){
    var MongoClient = mongodb.MongoClient;
    
    MongoClient.connect(url, function(err, client) {  
      const db = client.db(dbName);
    
      findJsTiles(db, function(data){
          res.render('js', {data: data[0].tailes, pageTestScript: '/qa/tests-js.js'});
          client.close();
      });
  
    });
});

module.exports = router;
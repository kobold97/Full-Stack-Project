var findMainTiles = require('../dbhelper').findMainTiles;
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
    
      findMainTiles(db, function(data){
          res.render('home', {data: data[0].tailes, pageTestScript: '/qa/tests-home.js'});
          client.close();
      });
  
    });
  });

module.exports = router;
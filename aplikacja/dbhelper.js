var findMainTiles = function(db, callback) {
    const collection = db.collection('main_tiles');
    collection.find({}).toArray(function(err, docs) {
      console.log("Found the following records");
      callback(docs);
    });
}

var findJsTiles = function(db, callback) {
    const collection = db.collection('js_tiles');
    collection.find({}).toArray(function(err, docs) {
      console.log("Found the following records");
      callback(docs);
    });
}

module.exports = {
    findMainTiles: findMainTiles,
    findJsTiles: findJsTiles
}
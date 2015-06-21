var setUpDatabase = require('word-phoneme-map').setUpDatabase;

var indexOpts = {
  dbLocation: __dirname + '/../data/word-phoneme-map.db'
};

console.log('Building word-phoneme-map.db. Takes about 45 minutes on a MacBook with a 2 GHz Intel Core Duo with 2 GB RAM.)');

setUpDatabase(indexOpts, reportDone);

function reportDone(error) {
  if (error) {
    console.log('Error while building word-phoneme-map.db:');
    console.log(error);
  }
  else {
    console.log('Built db at', indexOpts.dbLocation);
  }
}

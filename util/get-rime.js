var createRime = require('../index');
var seedrandom = require('seedrandom');
var queue = require('queue-async');
var _ = require('lodash');

if (process.argv.length < 3) {
  console.log('Usage: node get-rime.js <word>');
  process.exit();
}

var word = process.argv[2];

var seed = (new Date()).toISOString();
console.log('Seed:', seed);

createRime(
  {
    random: seedrandom(seed),
    wordPhonemeDbPath: __dirname + '/../data/word-phoneme-map.db'
  },
  getRhymesWithRime
);

function getRhymesWithRime(error, rime) {
  var rhymes = rime.getLastSyllableRhymes({
    base: word
  });

  console.log('Last syllable rhyme phoneme sequences:');
  console.log(JSON.stringify(rhymes, null, '  '));

  var q = queue(1);
  rhymes.forEach(queueGetWords);
  q.awaitAll(reportAllWords);

  function queueGetWords(rhyme) {
    q.defer(rime.getWordsThatFitPhonemes, rhyme)
  }
}

function reportAllWords(error, words) {
  if (error) {
    console.log(error, error.stack);
  }
  else {
    var cleanedUpWords = _.flatten(_.compact(words));
    console.log('Words that match rhyme sequences:');
    console.log(JSON.stringify(cleanedUpWords, null, '  '));
  }
}

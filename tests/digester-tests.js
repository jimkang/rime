var test = require('tape');
var createDigester = require('../digester').createDigester;

var wordMappingsPath = __dirname + 
  '/../data/syllables-for-words.json';

test('Word not found', function testWordNotFound(t) {
  t.plan(1);

  var digester = createDigester({
    wordMappingsPath: wordMappingsPath
  });

  var syllables = digester.digestToSyllables('zxcvuiop');

  t.equal(syllables, undefined, 'Returns undefined if it can\'t find word.');
});

var test = require('tape');
var createDigester = require('../digester').createDigester;

var wordSyllableMappingsPath = __dirname + 
  '/../data/syllables-for-words.json';

test('Word not found', function testWordNotFound(t) {
  t.plan(1);

  var digester = createDigester({
    wordSyllableMappingsPath: wordSyllableMappingsPath
  });

  var syllables = digester.digestToSyllables('zxcvuiop');

  t.equal(syllables, undefined, 'Returns undefined if it can\'t find word.');
});

test('Basic case', function basic(t) {
  t.plan(1);

  var digester = createDigester({
    wordSyllableMappingsPath: wordSyllableMappingsPath
  });

  t.deepEqual(
    digester.digestToSyllables('encyclopedia'),
    [
      [
        "IH",
        "N"
      ],
      [
        "S",
        "AY",
        "K"
      ],
      [
        "L",
        "AH"
      ],
      [
        "P",
        "IY"
      ],
      [
        "D",
        "IY"
      ],
      [
        "AH"
      ]
    ],
    'Returns the correct phonemes grouped into syllables.'
  );
});

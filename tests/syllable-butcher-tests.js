var test = require('tape');
var createButcher = require('../syllable-butcher').createButcher;
var seedrandom = require('seedrandom');

// test('Proper construction', function ctorTest(t) {
//   t.plan(1);

//   t.throws(
//     function createWithoutRandom() {
//       createButcher();
//     },
//     'No random function provided.',
//     'Throws if a random function is not provided.'
//   );
// });

test('Substitute', function substituteTest(t) {
  t.plan(1);

  var butcher = createButcher({
    random: seedrandom('wizard')
  });

  t.deepEqual(
    butcher.substitutePhoneme('CH'),
    'JH',
    'Substitutes phoneme with other phoneme from the same family.'
  );
});

test('Stuff tail', function stuffTailTest(t) {
  t.plan(1);
  
  var butcher = createButcher({
    random: seedrandom('2')
  });

  t.deepEqual(
    butcher.stuffSyllableTail('T'),
    ['N', 'T', 'END'],
    'Creates a syllable-ending phoneme sequence'
  );
});

test('Stuff head', function stuffHeadTest(t) {
  t.plan(1);
  
  var butcher = createButcher({
    random: seedrandom('smidgeo2dd')
  });

  t.deepEqual(
    butcher.stuffSyllableHead('G'),
    ['START', 'G', 'L'],
    'Creates a syllable-starting phoneme sequence'
  );
});

test('Substitutes', function substitutesTest(t) {
  t.plan(1);

  var butcher = createButcher();

  t.deepEqual(
    butcher.getPhonemeSubstitutes('CH'),
    ['JH', 'CH'],
    'Gets substitutes for phoneme from the same family.'
  );
});

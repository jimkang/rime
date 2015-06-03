var test = require('tape');
var createRime = require('../index');
var seedrandom = require('seedrandom');

var testCases = [
  {
    seed: 'basic-test2',
    word: 'wily',
    rhymes: [
      ["L","IY","L"],
      ["L","IY","G","R"],
      ["L","IY","P","L"],
      ["R","IY","L"],
      ["R","IY","G","R"],
      ["R","IY","P","L"],
      // ["L","IY","L"],
      // ["L","IY","G","R"],
      // ["L","IY","P","L"]
    ],
    matchingWords: [
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ]
  },
  {
    seed: 'basic-test2',
    word: 'tupac',
    rhymes: [
      [ 'B', 'AO', 'B' ],
      [ 'B', 'AO', 'D' ],
      [ 'B', 'AO', 'G' ],
      [ 'B', 'AO', 'K' ],
      [ 'B', 'AO', 'P' ],
      [ 'B', 'AO', 'T' ],
      [ 'D', 'Z', 'AO', 'B' ],
      [ 'D', 'Z', 'AO', 'D' ],
      [ 'D', 'Z', 'AO', 'G' ],
      [ 'D', 'Z', 'AO', 'K' ],
      [ 'D', 'Z', 'AO', 'P' ],
      [ 'D', 'Z', 'AO', 'T' ],
      [ 'G', 'AO', 'B' ],
      [ 'G', 'AO', 'D' ],
      [ 'G', 'AO', 'G' ],
      [ 'G', 'AO', 'K' ],
      [ 'G', 'AO', 'P' ],
      [ 'G', 'AO', 'T' ],
      [ 'K', 'AO', 'B' ],
      [ 'K', 'AO', 'D' ],
      [ 'K', 'AO', 'G' ],
      [ 'K', 'AO', 'K' ],
      [ 'K', 'AO', 'P' ],
      [ 'K', 'AO', 'T' ],
      [ 'P', 'R', 'K', 'AO', 'B' ],
      [ 'P', 'R', 'K', 'AO', 'D' ],
      [ 'P', 'R', 'K', 'AO', 'G' ],
      [ 'P', 'R', 'K', 'AO', 'K' ],
      [ 'P', 'R', 'K', 'AO', 'P' ],
      [ 'P', 'R', 'K', 'AO', 'T' ],
      [ 'T', 'AO', 'B' ],
      [ 'T', 'AO', 'D' ],
      [ 'T', 'AO', 'G' ],
      [ 'T', 'AO', 'K' ],
      [ 'T', 'AO', 'P' ],
      [ 'T', 'AO', 'T' ],
      [ 'P', 'AO', 'B' ],
      [ 'P', 'AO', 'D' ],
      [ 'P', 'AO', 'G' ],
      [ 'P', 'AO', 'K' ],
      [ 'P', 'AO', 'P' ],
      [ 'P', 'AO', 'T' ]
    ],
    // TODO: When `stuffHead` is fixed and doesn't create ridiculous 
    // sequences like "PRK", update.
    matchingWords: [
    ]
  }
];

testCases.forEach(runTest);

function runTest(testCase, caseNumber) {
  test('Rhymes test case ' + caseNumber, function caseGetRhymesTest(t) {
    var rime = createRime({
      random: seedrandom(testCase.seed),
      wordPhonemeDbPath: __dirname + '/../data/word-phoneme-map.db'
    });

    var rhymes = rime.getLastSyllableRhymes({
      base: testCase.word
    });

    t.plan(testCase.rhymes.length + 1);

    t.equal(
      testCase.rhymes.length,
      rhymes.length,
      'Returns the right number of rhymes.'
    );

    testCase.rhymes.forEach(checkRhymes);

    rime.closeDb();

    function checkRhymes(expected, i) {
      t.deepEqual(
        rhymes[i],
        expected,
        'Iteration ' + i + ': Returns the expected rhyme.'
      );
    }
  });

  // test('Words test case ' + caseNumber, function caseGetWordsTest(t) {
  //   var rime = createRime({
  //     random: seedrandom(testCase.seed),
  //     wordPhonemeDbPath: __dirname + '/../data/word-phoneme-map.db'
  //   });

  //   var words = testCase.rhymes.map(rime.getWordsThatFitPhonemes);

  //   t.plan(testCase.rhymes.length * 2 + 1);

  //   t.equal(
  //     testCase.rhymes.length,
  //     rhymes.length,
  //     'Returns the right number of rhymes.'
  //   );

  //   testCase.rhymes.forEach(checkRhymes);
  //   testCase.matchingWords.forEach(checkWords);

  //   function checkRhymes(expected, i) {
  //     t.deepEqual(
  //       rhymes[i],
  //       expected,
  //       'Iteration ' + i + ': Returns the expected rhyme.'
  //     );
  //   }

  //   function checkWords(expectedWords, i) {
  //     t.deepEqual(
  //       words[i],
  //       expectedWords,
  //       'Iteration ' + i + ': Returns the expected words.'
  //     );
  //   }
  // });

}

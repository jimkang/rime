var test = require('tape');
var createRime = require('../index');
var seedrandom = require('seedrandom');
var queue = require('queue-async');

var rhymeTestCases = [
  {
    seed: 'basic-test2',
    word: 'wily',
    rhymes: [
      ["L","IY"],
      ["R","IY"]
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
      [ 'T', 'AO', 'T' ]
    ]
  },
  {
    seed: '2015-06-24T01:45:19.441Z',
    word: 'aim',
    rhymes: [
      ['EY', 'M'],
      ['EY', 'N'],
      ['EY', 'NG']
    ]
  }
];

var wordMatchTestCases = [
  {    
    seed: 'basic-test2',
    sequences: [
      ["L","IY", "L"],
      ["R","IY", "L"]
    ],
    matchingWords: [
      [ 'LEAL', 'LILLE', 'BLEIL', 'KALEEL' ],
      [ 'REAL', 'REEL', 'RIEHL', 'RIEL',
      'BRIEL', 'CREAL', 'CREEL', 'FREEL', 'FRIEL', 'ADRIEL', 'VERRILL', 'FERRILL', 'TERRILE', 'CORIELL', 'MORRILL', 'ENRILE', 'UNREAL', 'MERIEL', 'AVERILL', 'JABRIL', 'CURIEL', 'PUERILE', 'MCGREAL', 'NEWSREEL', 'VANDRIEL', 'BECERRIL', 'VILLARREAL' ],
    ]
  },
  {
    seed: 'basic-test2',
    sequences: [
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
      [ 'T', 'AO', 'T' ]
    ],
    // TODO: When `stuffHead` is fixed and doesn't create ridiculous 
    // sequences like "PRK", update.
    matchingWords: [
      [],
      [
        "BAUD",
        "BAWD",
        "BACKBOARD"
      ],
      [
        "BOG"
      ],
      [
        "BALK"
      ],
      [
        "HALEBOPP"
      ],
      [
        "BOUGHT",
        'CAILLEBOTTE',
        'OVERBOUGHT'
      ],
      [],
      [],
      [],
      [],
      [],
      [],
      [
        "GAUB"
      ],
      [],
      [
        'METAGOGUE',
        'SYNAGOGUE'
      ],
      [
        "GAWK"
      ],
      [],
      [
        "GAUT",
        'BEGOT'
      ],
      [],
      [],
      [
        "COG",
        'ACOG'
      ],
      [
        "CALK",
        "CAULK",
        "KALK",
        "KAUK",
        'BABCOCK',
        'GAMECOCK',
        'POPPYCOCK'
      ],
      [
        "KAUP",
        "KAUPP",
        'KCOP'
      ],
      [
        "CAUGHT",
        'ACOTT', 'SICOTTE', 'PICOTTE', 'TURCOTTE', 'MARCOTTE', 'MASSICOTTE', 'BOURSICOT', 'BOURSICOT'
      ],
      [],
      [],
      [],
      [],
      [],
      [],
      [
        "TAUBE",
        'STAUB'
      ],
      [
        'STAUDE'
      ],
      [],
      [
        "TALK",
        'STALK', 'CROSSTALK', 'SMALLTALK', 'CORNSTALK', 'HONESTOK'
      ],
      [
        "TOP",
        'STAUP', 'RAGTOP', 'TREETOP'
      ],
      [
        "TAUGHT",
        "TAUT"
      ]
    ]
  }
];

rhymeTestCases.forEach(runRhymeTest);
wordMatchTestCases.forEach(runWordMatchTest);


function runRhymeTest(testCase, caseNumber) {
  test('Rhymes test case ' + caseNumber, function caseGetRhymesTest(t) {
    t.plan(testCase.rhymes.length + 3);

    createRime(
      {
        random: seedrandom(testCase.seed),
        wordPhonemeDbPath: __dirname + '/../data/word-phoneme-map.db'
      },
      useRime
    );

    function useRime(error, rime) {
      t.ok(!error, 'No error while creating rime.');

      var rhymes = rime.getLastSyllableRhymes({
        base: testCase.word
      });

      t.equal(
        testCase.rhymes.length,
        rhymes.length,
        'Returns the right number of rhymes.'
      );

      testCase.rhymes.forEach(checkRhymes);

      rime.closeDb(checkClose);

      function checkRhymes(expected, i) {
        t.deepEqual(
          rhymes[i],
          expected,
          'Iteration ' + i + ': Returns the expected rhyme.'
        );
      }
    }

    function checkClose(error) {
      t.ok(!error, 'No error while closing database.');
    }
  });
}

function runWordMatchTest(testCase, caseNumber) {
  test('Words test case ' + caseNumber, function caseGetWordsTest(t) {
    t.plan(testCase.matchingWords.length + 4);

    createRime(
      {
        random: seedrandom(testCase.seed),
        wordPhonemeDbPath: __dirname + '/../data/word-phoneme-map.db'
      },
      useRime
    );

    function useRime(error, rime) {
      t.ok(!error, 'No error while creating rime.');

      var q = queue(1);
      testCase.sequences.forEach(queueGetWords);
      q.awaitAll(checkAllWords);

      function queueGetWords(sequence) {
        q.defer(rime.getWordsThatFitPhonemes, sequence)
      }

      function checkAllWords(error, words) {
        t.ok(!error, 'No error occurred while getting words.');

        t.equal(
          testCase.matchingWords.length,
          words.length,
          'Returns the right number of matching words.'
        );

        testCase.matchingWords.forEach(checkWords);

        rime.closeDb(checkClose);

        function checkWords(expectedWords, i) {
          t.deepEqual(
            words[i],
            expectedWords,
            'Iteration ' + i + ': Returns the expected words.'
          );
        }
      }
    }

    function checkClose(error) {
      t.ok(!error, 'No error while closing database.');
    }
  });
}

test('Outer convenience method', function getRhymesTest(t) {
  t.plan(3);

  // TODO: Provide defaults.
  createRime(
    {
      random: seedrandom('outer'),
      wordPhonemeDbPath: __dirname + '/../data/word-phoneme-map.db'
    },
    useRime
  );

  function useRime(error, rime) {
    t.ok(!error, 'No error while creating rime.');

    rime.getRhymes(
      {
        base: 'beef'
      },
      checkWords
    );

    function checkWords(error, words) {
      t.ok(!error, 'No error occurred while getting words.');
      t.equal(words.length, 48, 'Gets the all the words that it should.');
    }
  }
});

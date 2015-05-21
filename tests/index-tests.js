var test = require('tape');
var createRime = require('../index');
var seedrandom = require('seedrandom');

test('Get rhymes', function rhymes(t) {
  var testCases = [
    // {
    //   seed: 'basic-test',
    //   word: 'tupac',
    //   rhymes: 
    //     [
    //       [
    //         ['UW'], ['P', 'AO', 'K']
    //       ]
    //     ]
    // },
    {
      seed: 'basic-test2',
      word: 'tupac',
      rhymes: 
        [
          [
            ['UW'], ['P', 'AO', 'K']
          ]
        ]
    },
  ];

  t.plan(testCases.length);

  testCases.forEach(runTest);

  function runTest(testCase) {
    var rime = createRime({
      random: seedrandom(testCase.seed)
    });

    t.deepEqual(
      rime.getRhymeSyllables({
        base: testCase.word
      }),
      testCase.rhymes,
      'Returns the expected rhymes.'
    );
  }
});

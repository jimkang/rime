var test = require('tape');
var createRime = require('../index');
var seedrandom = require('seedrandom');

test('Get rhymes', function rhymes(t) {
  var testCases = [
    {
      seed: 'basic-test',
      word: 'tupac',
      rhymes: 
[ [ [ 'B', 'UW', 'B' ], [ 'P', 'AO', 'K' ] ], [ [ 'B', 'UW', 'D' ], [ 'P', 'AO', 'K' ] ], [ [ 'B', 'UW', 'G' ], [ 'P', 'AO', 'K' ] ], [ [ 'B', 'UW', 'K' ], [ 'P', 'AO', 'K' ] ], [ [ 'B', 'UW', 'P' ], [ 'P', 'AO', 'K' ] ], [ [ 'B', 'UW', 'T' ], [ 'P', 'AO', 'K' ] ], [ [ 'B', 'UW', 'T' ], [ 'P', 'AO', 'K' ] ], [ [ 'D', 'UW', 'B' ], [ 'P', 'AO', 'K' ] ], [ [ 'D', 'UW', 'D' ], [ 'P', 'AO', 'K' ] ], [ [ 'D', 'UW', 'G' ], [ 'P', 'AO', 'K' ] ], [ [ 'D', 'UW', 'K' ], [ 'P', 'AO', 'K' ] ], [ [ 'D', 'UW', 'P' ], [ 'P', 'AO', 'K' ] ], [ [ 'D', 'UW', 'T' ], [ 'P', 'AO', 'K' ] ], [ [ 'D', 'UW', 'T' ], [ 'P', 'AO', 'K' ] ], [ [ 'G', 'UW', 'B' ], [ 'P', 'AO', 'K' ] ], [ [ 'G', 'UW', 'D' ], [ 'P', 'AO', 'K' ] ], [ [ 'G', 'UW', 'G' ], [ 'P', 'AO', 'K' ] ], [ [ 'G', 'UW', 'K' ], [ 'P', 'AO', 'K' ] ], [ [ 'G', 'UW', 'P' ], [ 'P', 'AO', 'K' ] ], [ [ 'G', 'UW', 'T' ], [ 'P', 'AO', 'K' ] ], [ [ 'G', 'UW', 'T' ], [ 'P', 'AO', 'K' ] ], [ [ 'K', 'UW', 'B' ], [ 'P', 'AO', 'K' ] ], [ [ 'K', 'UW', 'D' ], [ 'P', 'AO', 'K' ] ], [ [ 'K', 'UW', 'G' ], [ 'P', 'AO', 'K' ] ], [ [ 'K', 'UW', 'K' ], [ 'P', 'AO', 'K' ] ], [ [ 'K', 'UW', 'P' ], [ 'P', 'AO', 'K' ] ], [ [ 'K', 'UW', 'T' ], [ 'P', 'AO', 'K' ] ], [ [ 'K', 'UW', 'T' ], [ 'P', 'AO', 'K' ] ], [ [ 'P', 'UW', 'B' ], [ 'P', 'AO', 'K' ] ], [ [ 'P', 'UW', 'D' ], [ 'P', 'AO', 'K' ] ], [ [ 'P', 'UW', 'G' ], [ 'P', 'AO', 'K' ] ], [ [ 'P', 'UW', 'K' ], [ 'P', 'AO', 'K' ] ], [ [ 'P', 'UW', 'P' ], [ 'P', 'AO', 'K' ] ], [ [ 'P', 'UW', 'T' ], [ 'P', 'AO', 'K' ] ], [ [ 'P', 'UW', 'T' ], [ 'P', 'AO', 'K' ] ], [ [ 'T', 'UW', 'B' ], [ 'P', 'AO', 'K' ] ], [ [ 'T', 'UW', 'D' ], [ 'P', 'AO', 'K' ] ], [ [ 'T', 'UW', 'G' ], [ 'P', 'AO', 'K' ] ], [ [ 'T', 'UW', 'K' ], [ 'P', 'AO', 'K' ] ], [ [ 'T', 'UW', 'P' ], [ 'P', 'AO', 'K' ] ], [ [ 'T', 'UW', 'T' ], [ 'P', 'AO', 'K' ] ], [ [ 'T', 'UW', 'T' ], [ 'P', 'AO', 'K' ] ], [ [ 'T', 'UW', 'B' ], [ 'P', 'AO', 'K' ] ], [ [ 'T', 'UW', 'D' ], [ 'P', 'AO', 'K' ] ], [ [ 'T', 'UW', 'G' ], [ 'P', 'AO', 'K' ] ], [ [ 'T', 'UW', 'K' ], [ 'P', 'AO', 'K' ] ], [ [ 'T', 'UW', 'P' ], [ 'P', 'AO', 'K' ] ], [ [ 'T', 'UW', 'T' ], [ 'P', 'AO', 'K' ] ], [ [ 'T', 'UW', 'T' ], [ 'P', 'AO', 'K' ] ] ]        
    },
    {
      seed: 'basic-test2',
      word: 'tupac',
      rhymes: 
        [
          [
            ["T", "UW"],
            ["B", "AO", "B"]
          ],
          [
            ["T", "UW"],
            ["B", "AO", "D"]
          ],
          [
            ["T", "UW"],
            ["B", "AO", "G"]
          ],
          [
            ["T", "UW"],
            ["B", "AO", "K"]
          ],
          [
            ["T", "UW"],
            ["B", "AO", "P"]
          ],
          [
            ["T", "UW"],
            ["B", "AO", "T"]
          ],
          [
            ["T", "UW"],
            ["B", "AO", "P"]
          ],
          [
            ["T", "UW"],
            ["D", "AO", "B"]
          ],
          [
            ["T", "UW"],
            ["D", "AO", "D"]
          ],
          [
            ["T", "UW"],
            ["D", "AO", "G"]
          ],
          [
            ["T", "UW"],
            ["D", "AO", "K"]
          ],
          [
            ["T", "UW"],
            ["D", "AO", "P"]
          ],
          [
            ["T", "UW"],
            ["D", "AO", "T"]
          ],
          [
            ["T", "UW"],
            ["D", "AO", "P"]
          ],
          [
            ["T", "UW"],
            ["G", "AO", "B"]
          ],
          [
            ["T", "UW"],
            ["G", "AO", "D"]
          ],
          [
            ["T", "UW"],
            ["G", "AO", "G"]
          ],
          [
            ["T", "UW"],
            ["G", "AO", "K"]
          ],
          [
            ["T", "UW"],
            ["G", "AO", "P"]
          ],
          [
            ["T", "UW"],
            ["G", "AO", "T"]
          ],
          [
            ["T", "UW"],
            ["G", "AO", "P"]
          ],
          [
            ["T", "UW"],
            ["K", "AO", "B"]
          ],
          [
            ["T", "UW"],
            ["K", "AO", "D"]
          ],
          [
            ["T", "UW"],
            ["K", "AO", "G"]
          ],
          [
            ["T", "UW"],
            ["K", "AO", "K"]
          ],
          [
            ["T", "UW"],
            ["K", "AO", "P"]
          ],
          [
            ["T", "UW"],
            ["K", "AO", "T"]
          ],
          [
            ["T", "UW"],
            ["K", "AO", "P"]
          ],
          // TODO: When `stuffHead` is fixed and doesn't create ridiculous 
          // sequences like this, update.
          [
            ["T", "UW"],
            ["P", "R", "K", "AO", "B"]
          ],
          [
            ["T", "UW"],
            ["P", "R", "K", "AO", "D"]
          ],
          [
            ["T", "UW"],
            ["P", "R", "K", "AO", "G"]
          ],
          [
            ["T", "UW"],
            ["P", "R", "K", "AO", "K"]
          ],
          [
            ["T", "UW"],
            ["P", "R", "K", "AO", "P"]
          ],
          [
            ["T", "UW"],
            ["P", "R", "K", "AO", "T"]
          ],
          [
            ["T", "UW"],
            ["P", "R", "K", "AO", "P"]
          ],
          [
            ["T", "UW"],
            ["T", "AO", "B"]
          ],
          [
            ["T", "UW"],
            ["T", "AO", "D"]
          ],
          [
            ["T", "UW"],
            ["T", "AO", "G"]
          ],
          [
            ["T", "UW"],
            ["T", "AO", "K"]
          ],
          [
            ["T", "UW"],
            ["T", "AO", "P"]
          ],
          [
            ["T", "UW"],
            ["T", "AO", "T"]
          ],
          [
            ["T", "UW"],
            ["T", "AO", "P"]
          ],
          [
            ["T", "UW"],
            ["P", "AO", "B"]
          ],
          [
            ["T", "UW"],
            ["P", "AO", "D"]
          ],
          [
            ["T", "UW"],
            ["P", "AO", "G"]
          ],
          [
            ["T", "UW"],
            ["P", "AO", "K"]
          ],
          [
            ["T", "UW"],
            ["P", "AO", "P"]
          ],
          [
            ["T", "UW"],
            ["P", "AO", "T"]
          ],
          [
            ["T", "UW"],
            ["P", "AO", "P"]
          ]
        ]
    }
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

var split = require('split');
var util = require('util');

if (process.argv.length !== 2) {
  console.log(
    'Pipe in line-separated JSON. With each line containing data like so:\n' + 
    '  {\n' +
    '    "word": "GRIPS",\n' +
    '    "phonemes": [\n' +
    '      {\n' +
    '        "phoneme": "G",\n' +
    '        "stress": -1\n' +
    '      },\n' +
    '      {\n' +
    '        "phoneme": "R",\n' +
    '        "stress": -1\n' +
    '      },\n' +
    '      {\n' +
    '        "phoneme": "IH",\n' +
    '        "stress": 1\n' +
    '      },\n' +
    '      {\n' +
    '        "phoneme": "P",\n' +
    '        "stress": -1\n' +
    '      },\n' +
    '      {\n' +
    '        "phoneme": "S",\n' +
    '        "stress": -1\n' +
    '      }\n' +
    '    ],\n' +
    '    "syllables": [\n' +
    '      [\n' +
    '        "G",\n' +
    '        "R",\n' +
    '        "IH",\n' +
    '        "P",\n' +
    '        "S"\n' +
    '      ]\n' +
    '    ]\n' +
    '  }\n\n' +
    'Then, the output will be a JSON dictionary of syllables for word keys.\n\n' +
    'e.g. Usage: cat data/phoneme-groups-with-syllables.json | ' + 
    'node build/phoneme-groups-to-word-dict.js > worddict.json'
  );
  process.exit();
}

var start = process.hrtime();

function reportTime() {
  var elapsedTime = process.hrtime(start);
  process.stderr.write(
    util.format('Operation took %d seconds and %d nanoseconds.\n', 
      elapsedTime[0], elapsedTime[1]
    )
  );
}

var wordDict = {};

process.stdin.setEncoding('utf8');

var lineStream = split(JSON.parse);

lineStream.on('data', function addToDict(entry) {
  wordDict[entry.word] = entry.syllables;
});

lineStream.on('error', function reportError(error) {
  process.stderr.write(error.toString() + '\n');
  if (error.stack) {
    process.stderr.write('Stack:\n' + error.stack.toString() + '\n');
  }
});

lineStream.on('end', function onEnd() {
  process.stdout.write(JSON.stringify(wordDict, null, '  '));
  reportTime();
});

process.stdin.pipe(lineStream);

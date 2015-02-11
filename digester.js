var jsonfile = require('jsonfile');

function createDigester(opts) {
  var wordMap = jsonfile.readFileSync(opts.wordMappingsPath);

  function digestToSyllables(word) {
    var syllables;

    var wordKey = word.toUpperCase();

    if (wordKey in wordMap) {
      syllables = wordMap[wordKey];
    }

    return syllables;
  }

  return {
    digestToSyllables: digestToSyllables
  };
}

module.exports = {
  createDigester: createDigester
};

var jsonfile = require('jsonfile');

function createDigester(opts) {
  var wordMap = jsonfile.readFileSync(opts.wordMappingsPath);

  function digestToSyllables(word) {
    var syllables;
    return syllables;
  }

  return {
    digestToSyllables: digestToSyllables
  };
}

module.exports = {
  createDigester: createDigester
};

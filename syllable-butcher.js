var phonemeTypes = require('phoneme-types');
var probableLib = require('probable');
var _ = require('lodash');
var createSequencer = require('phoneme-sequencer').createSyllableCapSequencer;

function createSyllableButcher(opts) {
  if (!opts || typeof opts.random !== 'function') {
    throw new Error('No random function provided.');
  }

  var probable = probableLib.createProbable({
    random: opts.random
  });

  var sequencer = createSequencer({
    random: opts.random
  });

  function substitutePhoneme(phoneme) {
    var choices = phonemeTypes.getPhonemesInSameClass(phoneme).concat(phoneme);
    return probable.pickFromArray(choices);
  }

  function stuffSyllableHead(openingPhoneme) {
    return sequencer({
      base: ['START', openingPhoneme]
    });
  }

  function stuffSyllableTail(closingPhoneme) {
    return sequencer({
      base: [closingPhoneme, 'END']
    });
  }

  return {
    substitutePhoneme: substitutePhoneme,
    stuffSyllableHead: stuffSyllableHead,
    stuffSyllableTail: stuffSyllableTail
  };
}

module.exports = {
  createButcher: createSyllableButcher
};

var phonemeTypes = require('phoneme-types');
var probableLib = require('probable');
var _ = require('lodash');
var createSequencer = require('phoneme-sequencer').createSyllableCapSequencer;

function createSyllableButcher(opts) {
  // if (!opts || typeof opts.random !== 'function') {
  //   throw new Error('No random function provided.');
  // }

  var randomInOpts = {};
  if (opts) {
    randomInOpts.random = opts.random;
  }

  var probable = probableLib.createProbable(randomInOpts);

  var sequencer = createSequencer(randomInOpts);

  function substitutePhoneme(phoneme) {
    return probable.pickFromArray(getPhonemeSubstitutes(phoneme));
  }

  function getPhonemeSubstitutes(phoneme) {
    return phonemeTypes.getPhonemesInSameClass(phoneme).concat(phoneme);
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
    getPhonemeSubstitutes: getPhonemeSubstitutes,
    stuffSyllableHead: stuffSyllableHead,
    stuffSyllableTail: stuffSyllableTail
  };
}

module.exports = {
  createButcher: createSyllableButcher
};

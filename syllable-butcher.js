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
    return trimStart(sequencer({
      base: ['START', openingPhoneme]
    }));
  }

  function stuffSyllableTail(closingPhoneme) {
    return trimEnd(sequencer({
      base: [closingPhoneme, 'END']
    }));
  }

  return {
    substitutePhoneme: substitutePhoneme,
    getPhonemeSubstitutes: getPhonemeSubstitutes,
    stuffSyllableHead: stuffSyllableHead,
    stuffSyllableTail: stuffSyllableTail
  };
}

function trimStart(sequence) {
  var trimmed = sequence;
  if (sequence[0] === 'START') {
    trimmed = sequence.slice(1);
  }
  return trimmed;
}

function trimEnd(sequence) {
  var trimmed = sequence;
  if (sequence.length > 0 && sequence[sequence.length - 1] === 'END') {
    trimmed = sequence.slice(0, sequence.length - 1);
  }
  return trimmed;
}

module.exports = {
  createButcher: createSyllableButcher
};

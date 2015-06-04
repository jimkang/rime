var createButcher = require('./syllable-butcher').createButcher;
var exportMethods = require('export-methods');
var callBackOnNextTick = require('conform-async').callBackOnNextTick;
var seedrandom = require('seedrandom');
var createDigester = require('./digester').createDigester;
var createProbable = require('probable').createProbable;
var phonemeTypes = require('phoneme-types');
var divideSyllable = require('./divide-syllable');
var _ = require('lodash');
var createWordPhonemeMap = require('word-phoneme-map').createWordPhonemeMap;

function createRime(opts) {
  var random;
  var wordSyllableMappingsPath;
  var wordPhonemeDbPath;

  if (opts) {
    random = opts.random;
    wordSyllableMappingsPath = opts.wordSyllableMappingsPath;
    wordPhonemeDbPath = opts.wordPhonemeDbPath;
  }

  if (!wordPhonemeDbPath) {
    wordPhonemeDbPath = __dirname + '/data/word-phoneme-map.db';
  }
  if (!random) {
    random = seedrandom((new Date()).toISOString());
  }
  if (!wordSyllableMappingsPath) {
    wordSyllableMappingsPath = __dirname + '/data/syllables-for-words.json';
  }

  var probable = createProbable({
    random: random
  });

  var butcher = createButcher({
    random: random
  });

  var digester = createDigester({
    wordSyllableMappingsPath: wordSyllableMappingsPath
  });

  var wordPhonemeMap = createWordPhonemeMap({
    dbLocation: wordPhonemeDbPath
  });

  function getLastSyllableRhymes(opts) {
    var rhymes;
    var base = opts.base;
    var indexOfSyllableToVary = opts.indexOfSyllableToVary;

    var syllables = digester.digestToSyllables(base);
    if (syllables && syllables.length > 0) {
      if (isNaN(indexOfSyllableToVary) ||
        indexOfSyllableToVary >= syllables.length) {

        indexOfSyllableToVary = syllables.length - 1;
      }

      var varyingSyllablePosition = 'middle';
      if (indexOfSyllableToVary === 0) {
        varyingSyllablePosition = 'start';
      }
      else if (indexOfSyllableToVary === syllables.length - 1) {
        varyingSyllablePosition = 'end';
      }

      return getSyllableVariants(
        butcher, syllables[indexOfSyllableToVary], varyingSyllablePosition
      );
    }

    return rhymes;
  }

  function getSyllableVariants(butcher, phonemes, syllablePosition) {
    var dividedSyllable = divideSyllable(phonemes);
    if (dividedSyllable.middle.length > 1) {
      throw new Error('Turns out you do have to deal with multiple middle phonemes!');
    }
    // 1. Get substitutes for the phonemes at the start and end.
    var startingPhoneme = dividedSyllable.start;
    var endingPhoneme = dividedSyllable.end;
    var startingSubstitutes = butcher.getPhonemeSubstitutes(startingPhoneme);
    var endingSubstitutes = butcher.getPhonemeSubstitutes(endingPhoneme);

    // 2. Stuff heads and tails for each of those substitutes.
    var startSequences = startingSubstitutes.map(butcher.stuffSyllableHead);
    var endSequences = startingSubstitutes.map(butcher.stuffSyllableTail);
    // 3. Reconstitute the permutations.
    var permutationElements = [];
    addToArrayIfExists(permutationElements, startSequences);
    addToArrayIfExists(permutationElements, dividedSyllable.middle);
    addToArrayIfExists(permutationElements, endSequences);
    var product = probable.getCartesianProduct(permutationElements);
    return uniqNested(product);
  }

  function getWordsThatFitPhonemes(phonemes, done) {
    wordPhonemeMap.wordsForPhonemeSequence(phonemes, done);
  }

  function closeDb(done) {
    wordPhonemeMap.close(done);
  }

  return exportMethods(getLastSyllableRhymes, getWordsThatFitPhonemes, closeDb);
}

function addToArrayIfExists(array, element) {
  if (element) {
    array.push(element);
  }
}

function uniqNested(array) {
  var result = [];
  for (var i = 0; i < array.length; ++i) {
    var value = array[i];
    if (!elementIsInArray(value, result)) {
      result.push(value);
    }
  }
  return result;
}

function elementIsInArray(element, array) {
  return array.some(isEqualToElement);

  function isEqualToElement(anElement) {
    return _.isEqual(anElement, element);
  }
}

module.exports = createRime;

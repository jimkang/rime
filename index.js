var createButcher = require('./syllable-butcher').createButcher;
var exportMethods = require('export-methods');
var callBackOnNextTick = require('conform-async').callBackOnNextTick;
var seedrandom = require('seedrandom');
var createDigester = require('./digester').createDigester;
var createProbable = require('probable').createProbable;
var phonemeTypes = require('phoneme-types');
var divideSyllable = require('./divide-syllable');
var _ = require('lodash');

function createRime(opts) {
  var random;
  var wordMappingsPath;

  if (opts) {
    random = opts.random;
    wordMappingsPath = opts.wordMappingsPath;
  }

  if (!random) {
    random = seedrandom((new Date()).toISOString());
  }
  if (!wordMappingsPath) {
    wordMappingsPath = __dirname + '/data/syllables-for-words.json';
  }

  var probable = createProbable({
    random: random
  });

  var butcher = createButcher({
    random: random
  });

  var digester = createDigester({
    wordMappingsPath: wordMappingsPath
  });

  function getRhymeSyllables(opts) {
    var rhymes;
    var base = opts.base;
    var indexOfSyllableToVary = opts.indexOfSyllableToVary;

    // TODO: Produce rhymes that are shorter than the base.
    var syllables = digester.digestToSyllables(base);
    if (syllables && syllables.length > 0) {
      if (isNaN(indexOfSyllableToVary) ||
        indexOfSyllableToVary >= syllables.length) {

        indexOfSyllableToVary = probable.roll(syllables.length);
      }

      var varyingSyllablePosition = 'middle';
      if (indexOfSyllableToVary === 0) {
        varyingSyllablePosition = 'start';
      }
      else if (indexOfSyllableToVary === syllables.length - 1) {
        varyingSyllablePosition = 'end';
      }

      var variants = getSyllableVariants(
        butcher, syllables[indexOfSyllableToVary], varyingSyllablePosition
      );
      rhymes = permuteWordWithSyllableVariants(
        syllables, indexOfSyllableToVary, variants
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
    debugger;
    return probable.getCartesianProduct(permutationElements);
  }

  return exportMethods(getRhymeSyllables);
}


function addToArrayIfExists(array, element) {
  if (element) {
    array.push(element);
  }
}

function permuteWordWithSyllableVariants(syllables, indexToVary, variants) {
  return variants.map(syllablesWithVariantInserted);

  function syllablesWithVariantInserted(variant) {
    var withVariant = syllables.slice();
    withVariant[indexToVary] = variant;
    return withVariant;
  }
}

module.exports = createRime;

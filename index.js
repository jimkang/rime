var createButcher = require('./syllable-butcher').createButcher;
var exportMethods = require('export-methods');
var callBackOnNextTick = require('conform-async').callBackOnNextTick;
var seedrandom = require('seedrandom');
var createDigester = require('./digester').createDigester;
var createProbable = require('probable').createProbable;
var divideSyllable = require('./divide-syllable');
var _ = require('lodash');
var createWordPhonemeMap = require('word-phoneme-map').createWordPhonemeMap;
var queue = require('queue-async');

function createRime(opts, createDone) {
  var random;
  var wordSyllableMappingsPath;
  var wordPhonemeDbPath;
  var wordPhonemeMap;

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

  createWordPhonemeMap(
    {
      dbLocation: wordPhonemeDbPath
    },
    passBackExports
  );

  // TODO: Rename to getSequencesThatRhymeWithLastSyllable?
  // Something more accurate but not that long.
  function getLastSyllableRhymes(opts) {
    var rhymes;
    var base ;
    var indexOfSyllableToVary;
    var strict;

    if (opts) {
      base = opts.base
      indexOfSyllableToVary = opts.indexOfSyllableToVary;
      strict = opts.strict;
    }

    var syllables = digester.digestToSyllables(base);

    if (strict) {
      return syllables;
    }
    else if (syllables && syllables.length > 0) {
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

    var startingSubstitutes;
    var endingSubstitutes;
    var startSequences;
    var endSequences;

    if (startingPhoneme) {
      startingSubstitutes = butcher.getPhonemeSubstitutes(startingPhoneme);
    }

    if (endingPhoneme) {
      endingSubstitutes = butcher.getPhonemeSubstitutes(endingPhoneme);
    }

    // 2. Stuff heads and tails for each of those substitutes.
    if (startingSubstitutes) {
      startSequences = startingSubstitutes.map(butcher.stuffSyllableHead);
    }
    else {
      startSequences = startingPhoneme ? [startingPhoneme] : undefined;
    }

    if (endingSubstitutes) {
      endSequences = endingSubstitutes;
    }

    // 3. Reconstitute the permutations.
    var permutationElements = [];
    addToArrayIfExists(permutationElements, startSequences);
    addToArrayIfExists(permutationElements, dividedSyllable.middle);
    addToArrayIfExists(permutationElements, endSequences);
    var product = probable.getCartesianProduct(permutationElements);
    return uniqNested(product);
  }

  function getWordsThatFitPhonemes(phonemes, done) {
    wordPhonemeMap.wordsForPhonemeEndSequence(phonemes, done);
  }

  function getRhymes(opts, done) {
    var rhymePhonemes = getLastSyllableRhymes(opts);

    var q = queue(1);
    rhymePhonemes.forEach(queueGetWords);
    q.awaitAll(done);

    function queueGetWords(rhyme) {
      q.defer(getWordsThatFitPhonemes, rhyme);
    }
  }

  function closeDb(done) {
    wordPhonemeMap.close(done);
  }

  function passBackExports(error, theWordPhonemeMap) {
    wordPhonemeMap = theWordPhonemeMap;
    createDone(
      error,
      exportMethods(
        getRhymes,
        getLastSyllableRhymes,
        getWordsThatFitPhonemes,
        closeDb
      )
    );
  }
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

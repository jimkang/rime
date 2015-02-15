var createButcher = require('../syllable-butcher').createButcher;
var createDigester = require('../digester').createDigester;
var seedrandom = require('seedrandom');
var _ = require('lodash');
var phonemeTypes = require('phoneme-types');

if (process.argv.length < 3) {
  console.log('Usage: node get-end-of-rhyme.js <word>');
  process.exit();
}

var word = process.argv[2];

var wordMappingsPath = __dirname + '/../data/syllables-for-words.json';

var digester = createDigester({
  wordMappingsPath: wordMappingsPath
});

var syllables = digester.digestToSyllables(word);

if (!Array.isArray(syllables) || syllables.length < 1) {
  process.stderr.write('Could not get syllables for ' + word + '.\n');
  process.exit();
}

var lastSyllable = syllables[syllables.length - 1];
console.log('Last syllable: ' + lastSyllable);

var vowel = _.find(lastSyllable, phonemeTypes.isVowelish);

console.log('Found vowel:', vowel);

var seed = (new Date()).getTime().toString();

console.log('Using seed:', seed);

var butcher = createButcher({
  random: seedrandom(seed)
});

var openingConsonant;
var closingConsonant;
var newOpener;
var newCloser;

if (phonemeTypes.isConsonantish(lastSyllable[0])) {
  openingConsonant = lastSyllable[0];
  newOpener = butcher.substitutePhoneme(openingConsonant);
}
if (phonemeTypes.isConsonantish(lastSyllable[lastSyllable.length - 1])) {
  closingConsonant = lastSyllable[lastSyllable.length - 1];
  newCloser = butcher.substitutePhoneme(closingConsonant);
}

console.log('Opening consonant:', openingConsonant);
console.log('Closing consonant:', closingConsonant);
console.log('New opener:', newOpener);
console.log('New closer:', newCloser);

var newHeadOfLastSyllable = [];
if (newOpener) {
  newHeadOfLastSyllable = butcher.stuffSyllableHead(newOpener);
}

var newTailOfLastSyllable = [];
if (newCloser) {
  newTailOfLastSyllable = butcher.stuffSyllableTail(newCloser);
}

var newLastSyllable = newHeadOfLastSyllable.slice();
newLastSyllable.push(vowel);
newLastSyllable = newLastSyllable.concat(newTailOfLastSyllable);

console.log('Rhyming last syllable:', newLastSyllable);

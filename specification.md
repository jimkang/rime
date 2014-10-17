Specification
-------------

Unless specified otherwise, any function that has multiple arguments takes them in a single opts object.

**getRhymesForWord(wordPhonemes, getSyllableRhymes)** =>
  > Where:
  - `wordPhonemes` is an array of phonemes representing a word
  - `getSyllableRhymes` is a function that takes syllablePhonemes and returns sets of phonemes that rhyme with syllablePhonemes, e.g. getLooseRhymesForSyllable

- Finds syllables using something like phonemize-syllablize.
    e.g. `echo "ENCYCLOPEDIA  IH0 N S AY2 K L AH0 P IY1 D IY0 AH0" | node phonemize-syllablize.js tmp.txt`
- Finds the last syllable.
- Returns syllables 0 - (n - 1) * each(getSyllableRhymes(last syllable))

**getLooseRhymesForSyllable(syllablePhonemes)** =>
  - Gets a map in which:
    - Each phoneme in `syllablePhonemes` => getRelatedPhonemeClasses(phoneme)
      > *Where:* getRelatedPhonemeClasses is a function that gets classes related to the given phoneme's class, like ...
  - Returns ... (actual phoneme combinations)

**getRelatedPhonemes(phoneme)** =>
  - One phoneme can be transformed into multiple phonemes or to none.
  - Returns all combinations of the class groups as multiple chains (arrays)

**getSubstituteForPhoneme**

transformRhymeClass(phonemeClass, isInLastSyllable, phonemePositionInSyllable) =>
  Where `phonemePositionInSyllable` is either `start`, `middle`, or `end`.

Specification
-------------

Unless specified otherwise, any function that has multiple arguments takes them in a single opts object.

**getRhymesForWord(wordPhonemes, getSyllableRhymes)**
> Given:
- `wordPhonemes` is an array of phonemes representing a word
- `getSyllableRhymes` is a function that takes syllablePhonemes and returns sets of phonemes that rhyme with syllablePhonemes, e.g. getLooseRhymesForSyllable

> Then:
- It finds syllables using something like phonemize-syllablize.
    e.g. `echo "ENCYCLOPEDIA  IH0 N S AY2 K L AH0 P IY1 D IY0 AH0" | node phonemize-syllablize.js tmp.txt`
- It finds rhymes for the last syllable via `getSyllableRhymes`
- Returns `[first n - 1 syllables].concat(last syllable rhymes[i])` *for* i = 0, i < lastSyllableRhymes.length.

**getLooseRhymesForSyllable(syllablePhonemes, getPhonemeClass)**
> Given:
- `syllablePhonemes` is an array of phonemes comprising a syllable.
- `getPhonemeClass` is a function that returns a phoneme class string (e.g. 'fricative') for a given phoneme. (One already exists in `phonemizeNavigator`.)
- `getRelatedPhonemeClasses` is a function that returns an sequence of related phoneme classes for a given phoneme class and position in the syllable. For example, getRelatedPhonemeClassesForRhyming might return only [['vowel']] for 'vowel', but return [['fricative'], ['fricative', 'liquid']] for 'fricative' at the beginning of a syllable.

> Then:
- It maps each phoneme to a phoneme class via `getPhonemeClass`.
- It maps each phoneme class to sequences of 0+ related phonemes via `getRelatedPhonemeClasses`. Let's call this result an classSequenceSetArray.
  - e.g. ['fricative', 'liquid'] is a class sequence. [['fricative'], ['fricative', 'liquid'], ['fricative', 'aspirate']] is a class sequence set.
```
        [
          [[], ['fricative'], ['fricative', 'liquid'], ['fricative', 'aspirate']],
          [['vowel']],
          [[], ['stop'], ['liquid', stop]]
        ]```
  is a class sequence set array.
- It generates an array of all of the possible class sequence permutations (the Cartesian product, see [method in probable](https://github.com/jimkang/probable/blob/master/probable.js#L108)) from the class sequence set array. e.g. Given the following array:
```
      [
        [sequenceNull, sequenceA, sequenceB],
        [sequenceOmega, sequenceGamma],
        [sequenceNull, sequence1, sequence2]
      ]```
    This function will generate:
```
      [
        [sequenceNull, sequenceOmega, sequenceNull],
        [sequenceNull, sequenceOmega, sequence1],
        [sequenceNull, sequenceOmega, sequence2],
        [sequenceNull, sequenceGamma, sequenceNull],
        [sequenceNull, sequenceGamma, sequence1],
        [sequenceNull, sequenceGamma, sequence2],
        [sequenceA, sequenceOmega, sequenceNull],
        [sequenceA, sequenceOmega, sequence1],
        [sequenceA, sequenceOmega, sequence2],
        [sequenceA, sequenceGamma, sequenceNull],
        [sequenceA, sequenceGamma, sequence1],
        [sequenceA, sequenceGamma, sequence2],
        [sequenceB, sequenceOmega, sequenceNull],
        [sequenceB, sequenceOmega, sequence1],
        [sequenceB, sequenceOmega, sequence2]
        [sequenceB, sequenceGamma, sequenceNull],
        [sequenceB, sequenceGamma, sequence1],
        [sequenceB, sequenceGamma, sequence2]
      ]```

- It uses phonemeNavigator.getPhonemesClass` to map the class sequence permutations to all of the possible phoneme sequences (there will be many phoneme sequences for each class sequence).
- It returns those phoneme sequences.

**getRelatedPhonemesForLooseRhyme(phoneme)** =>
  - This is implements the getRelatedPhonemeClasses "interface."
  - One phoneme can be transformed into multiple phonemes or to none.
  - Returns all combinations of the class groups as multiple chains (arrays)

**getSubstituteForPhoneme**

transformRhymeClass(phonemeClass, isInLastSyllable, phonemePositionInSyllable) =>
  Where `phonemePositionInSyllable` is either `start`, `middle`, or `end`.




Simpler (?) loose rhyming:

- Break up the last syllable into phonemes.
- Preserve the vowelish phoneme.
- Get the classes of the phonemes that follow the vowel. For each, pick another phoneme from those classes.
  - You can't do this. You can end up with ['L', 'JH'] for ['R', 'CH'], which doesn't make sense.
  - Instead, substitute a phoneme from the last phoneme and grow the sequence back to the vowel.
- Set up a partial phoneme chain using the phonemes from the last two steps. (vowel + substitute consonants)
- Pass that to a phoneme-sequencer to grow it out to the start.
- Reassemble.
- Look up words ending with that new chain.



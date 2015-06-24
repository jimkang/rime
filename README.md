rime
====

rime is a module that finds rhymes, including loose rhymes.

A rhyme finder that works by strictly matching the phonemes of the last syllable of words would get rhymes like:

    SHAME
    TAME
    BAIM
    BAME
    BOEHM
    BOEHME
    GAME
    CAME
    KAIM
    NAME
    DAME
    DAMME

However, rime can additionally find rhymes like:

    GAIN
    LAIN
    LAINE
    LANE
    MOSCOWANE
    WINDOWPANE
    PREORDAIN
    LEGERDEMAIN
    ST_GERMAIN
    ST_GERMAINE
    MANGIAPANE
    SULFUROPHANE
    FINKIELSTAIN
    POLYURETHANE
    CYCLOHEXANE
    AINGE
    CHSEING
    MERENGUE
    D'ESTAING

In some artistic contexts, this is desirable.

Installation
------------

    npm install rime

Then, there is a manual postinstall step:

    cd node_modules/rime
    make build-word-phoneme-map

It's not run on postinstall automatically because it takes a while, about 40 minutes on a computer with a 3.2 GHz i3 processor with 4 GB of RAM. But once you do it, you never have to do it again. This step builds a database that indexes every word in the CMU Pronouncing Dictionary by phoneme sequence and also by reverse phoneme sequence. With this, `rime` can look up what words correspond to what phonemes quickly.

Usage
-----

Create an instance of rime.

    var createRime = require('rime');

    createRime(
      {
        random: seedrandom('outer'),
        wordPhonemeDbPath: __dirname + '/../data/word-phoneme-map.db'
      },
      useRime
    );

    function useRime(error, rime) {
      if (error) {
        console.log(error);
      }

      rime.getRhymes(
        {
          base: 'pock'
        },
        reportWords
      );

      function reportWords(error, words) {
        if (error) {
          console.log(error);
        }
        else {
          console.log(words);
        }
      }

API
---

TODO

Tests
-----

Run tests with `make test`.

[Specification](specification.md)

License
-------

MIT.

var phonemeTypes = require('phoneme-types');

function divideSyllable(syllableSequence) {
  var divided = {};
  syllableSequence.forEach(putPhonemeInDivision);
  return divided;

  function putPhonemeInDivision(phoneme) {
    if (phonemeTypes.isVowelish(phoneme)) {
      addToArrayIfThere(divided, 'middle', phoneme);
    }
    else {
      if ('middle' in divided) {
        addToArrayIfThere(divided, 'end', phoneme);        
      }
      else {
        addToArrayIfThere(divided, 'start', phoneme);
      }
    }
  }
}

function addToArrayIfThere(dict, key, value) {
  if (key in dict) {
    dict[key] = dict[key].concat(value);
  }
  else {
    dict[key] = [value];
  }
}

module.exports = divideSyllable;

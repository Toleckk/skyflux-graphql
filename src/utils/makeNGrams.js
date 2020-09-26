const letters = {
  α: 'a',
  ά: 'a',
  αυ: 'af',
  αύ: 'af',
  à: 'a',
  á: 'a',
  â: 'a',
  ã: 'a',
  ä: 'a',
  å: 'a',
  ą: 'a',
  β: 'v',
  ß: 's',
  ç: 'c',
  γ: 'g',
  γγ: 'ng',
  γκ: 'gk',
  γξ: 'nx',
  δ: 'd',
  ð: 'd',
  ε: 'e',
  æ: 'e',
  έ: 'e',
  ευ: 'ev',
  εύ: 'ev',
  è: 'e',
  é: 'e',
  ê: 'e',
  ë: 'e',
  ζ: 'z',
  η: 'i',
  ή: 'i',
  ηυ: 'if',
  θ: 'th',
  ι: 'i',
  ί: 'i',
  ϊ: 'i',
  ἰ: 'i',
  ΐ: 'i',
  ì: 'i',
  í: 'i',
  î: 'i',
  ï: 'i',
  κ: 'k',
  λ: 'l',
  μ: 'm',
  ν: 'n',
  ñ: 'n',
  ξ: 'ks',
  ο: 'o',
  ό: 'o',
  ò: 'o',
  ó: 'o',
  ô: 'o',
  õ: 'o',
  ö: 'o',
  ø: 'o',
  π: 'p',
  þ: 'p',
  ρ: 'r',
  σ: 's',
  ς: 's',
  τ: 't',
  υ: 'u',
  ύ: 'u',
  ϋ: 'u',
  ΰ: 'u',
  ù: 'u',
  ú: 'u',
  û: 'u',
  ü: 'u',
  φ: 'f',
  ý: 'y',
  ÿ: 'y',
  χ: 'ch',
  ψ: 'ps',
  ω: 'o',
  ώ: 'o',
}

function handleGreekIdioms(ch, nextCh) {
  var found = false
  var letter = null

  if (!nextCh) {
    return {letter: letters[ch], found}
  }

  switch (ch) {
    case 'α':
    case 'ε':
    case 'γ':
    case 'η':
      letter = letters[`${ch}${nextCh}`]
      found = !!letter
      break
  }

  return {letter: letter || letters[ch], found}
}

function replaceLanguageCharacters(word) {
  if (!word) {
    return ''
  }

  var newWord = ''
  var index = 0

  word = word.toLowerCase()
  while (index < word.length) {
    var idiom = false
    var ch = word[index]
    var nextCh = word[index + 1]

    if (!letters[ch]) {
      newWord += ch
    } else {
      var {letter, found} = handleGreekIdioms(ch, nextCh)
      newWord += letter
      idiom = found
    }

    if (idiom) {
      index = index + 2
    } else {
      index++
    }
  }

  return newWord
}

/**
 * Reusable constant values
 * @typedef {Object} constants
 * @property {number} DEFAULT_MIN_SIZE - Default min size for anagrams.
 * @property {boolean} DEFAULT_PREFIX_ONLY - Whether return ngrams from start of word or not
 */
var constants = {
  DEFAULT_MIN_SIZE: 2,
  DEFAULT_PREFIX_ONLY: false,
}

/**
 * Creates sequence of characters taken from the given string.
 * @param {string} text - The string for the sequence.
 * @param {number} minSize - Lower limit to start creating sequence.
 * @param {boolean} prefixOnly -Only return ngrams from start of word.
 * @return {Array} The sequence of characters in Array of Strings.
 */
function nGrams(text, minSize, prefixOnly) {
  if (minSize == null) {
    minSize = constants.DEFAULT_MIN_SIZE
  }

  var set = new Set()
  var index

  if (minSize <= 0) {
    throw new Error('minSize must be greater than 0.')
  }

  if (!text) {
    return []
  }

  text = text.slice ? text.toLowerCase() : String(text)
  index = prefixOnly ? 0 : text.length - minSize + 1

  if (text.length <= minSize) {
    return [text]
  }

  if (!prefixOnly && index < 1) {
    return []
  }

  if (prefixOnly) {
    while (minSize < text.length + 1) {
      set.add(text.slice(index, index + minSize))
      minSize++
    }

    return Array.from(set)
  }

  while (minSize <= text.length + 1) {
    if (index !== 0) {
      set.add(text.slice(--index, index + minSize))
    } else {
      minSize++
      index = text.length - minSize + 1
    }
  }

  return Array.from(set)
}

/**
 * Creates sequence of each word from the given string.
 * @param {string} text - The string for the sequence.
 * @param {boolean} escapeSpecialCharacters - Escape special characters from the given string.
 * @param {number} minSize - Lower limit to start creating sequence.
 * @param {boolean} prefixOnly -Only return ngrams from start of word.
 * @return {Array} The sequence of characters in Array of Strings.
 */
export function makeNGrams(
  text,
  escapeSpecialCharacters = false,
  minSize = constants.DEFAULT_MIN_SIZE,
  prefixOnly = constants.DEFAULT_PREFIX_ONLY,
) {
  if (!text) return []

  const result = text
    .split(' ')
    .map(function (q) {
      return nGrams(
        replaceSymbols(q, escapeSpecialCharacters),
        minSize,
        prefixOnly,
      )
    })
    .reduce((acc, arr) => acc.concat(arr), [])

  return Array.from(new Set(result))
}

/**
 * Removes special symbols from string.
 * @param {string} text - The string to remove the characters.
 * @param {boolean} escapeSpecialCharacters - If this value is true, it will also remove all the special characters.
 * @return {string} the given text without the special characters.
 */
function replaceSymbols(text, escapeSpecialCharacters) {
  text = text.toLowerCase()
  if (escapeSpecialCharacters) {
    text = text.replace(/[!\"#%&\'\(\)\*\+,-\.\/:;<=>?@\[\\\]\^`\{\|\}~]/g, '') // remove special characters
  }
  text = text.replace(/_/g, ' ')
  text = replaceLanguageCharacters(text)

  return text
}

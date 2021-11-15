import { ItemInformation } from "./suggest-data";

// english string manipulation (※ also supports Japanese)
const toTriming = (inputString: string) => inputString.trim();
const toLowerCased = (inputString: string) => inputString.toLowerCase();
const isIncludes = (suggestString: string, inputString: string) => suggestString.includes(inputString);

// japanese string manipulation
// @NOTE unicode sample
// @see https://qiita.com/graminume/items/2ac8dd9c32277fa9da64

// all japanese unicode
const hiraKanaUnicode = /^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/;
const isJapanase = (inputString: string) => hiraKanaUnicode.test(inputString);

// 「ひらがな」
const hiraganaUnicode = /[\u3040-\u309f]/;
const isHiragana = (inputString: string) => hiraganaUnicode.test(inputString);
const hiraToKana = (inputString: string) => {
  return inputString.replace(hiraganaUnicode, function(match) {
    const character = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(character);
  });
}

// 「カタカナ」
const katakanaUnicode = /[\u30a0-\u30ff]/;
const isKatakana = (inputString: string) => katakanaUnicode.test(inputString);
const kanaToHira = (inputString: string) => {
  return inputString.replace(katakanaUnicode, function(match) {
    const character = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(character);
  });
}

// processed string for suggestion multiple language for english and japanese
const createInputProcessedString = (inputValue: string): string => toLowerCased(toTriming(inputValue));

const judgeHiraKana = (inputString: string, suggestString: string) => {
  if(isHiragana(inputString)) {
    /**
     * @NOTE
     * 入力値が「ひらがな」の場合、全ての入力候補を「ひらがな」変換して総当り
     */
    return isIncludes(kanaToHira(suggestString), inputString);
  }
  if(isKatakana(inputString)){
    /**
     * @NOTE
     * 入力値が「カタカナ」の場合、全ての入力候補を「カタカナ」変換して総当り
     */
    return isIncludes(hiraToKana(suggestString), inputString);
  }
}

/**
 * @NOTE
 * suggestion が任意のオブジェクトで key/value の key を代入する形で対応する時（動的に指定する）、
 * onSuggestionsClearRequested のタイミングで target の取得ができず上手く行かない
 */
// const getSuggestionValue = (suggestion, target?) => {
//   if(target && target.length === 0) return suggestions[target];
//   if(!target) return suggestion;
// }
export const getSuggestionValue = suggestion => suggestion.name;

// prepare suggest logics
export const getSuggestions= <T extends ItemInformation>(inputValue: string, candidateList: T[]): T[] => {
  const inputProcessedString = createInputProcessedString(inputValue);
  const inputLength = inputProcessedString.length;

  return inputLength === 0
    ? []
    : candidateList.filter(candidate => {
      if (isJapanase(inputProcessedString)) {
        return judgeHiraKana(inputProcessedString, getSuggestionValue(candidate));
      } else {
        return isIncludes(toLowerCased(getSuggestionValue(candidate)), inputProcessedString);
      }
    });
};
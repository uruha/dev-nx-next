import { useForm, Controller, NestedValue, SubmitHandler } from 'react-hook-form';
import Autosuggest from 'react-autosuggest';
import { ChangeEvent, useState } from 'react';

import { FoodAndDrink, foodAndDrinkCandidates } from '../lib/suggest-data';

function SuggestForm() {
  /**
   * -----------------------
   * react-hook-form setting 
   * -----------------------
   */ 
  const {
    handleSubmit,
    control,
    // @NOTE react-hook-form の data にセットする際の処理
    // setValue
  } = useForm();

  const onSubmit = data => {
    console.log(selectedValue);
    console.log(data);
  };

  /**
   * ----------------------------
   * react-autosuggestion setting
   * ----------------------------
   */ 
  // prepare suggest hooks
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<FoodAndDrink[]>([]);
  
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
  const hiraToKana = (inputStrig: string) => {
    return inputStrig.replace(/[\u3040-\u309f]/g, function(match) {
        const character = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(character);
    });
  }

  // 「カタカナ」
  const katakanaUnicode = /[\u30a0-\u30ff]/;
  const isKatakana = (inputString: string) => katakanaUnicode.test(inputString);
  const kanaToHira = (inputString: string) => {
    return inputString.replace(/[\u30a1-\u30f6]/g, function(match) {
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
   * @NOTE 2021/10/31 現在
   * suggestion が任意のオブジェクトで key/value の key を代入する形で対応する時（動的に指定する）、
   * onSuggestionsClearRequested のタイミングで target の取得ができず上手く行かない
   */
  // const getSuggestionValue = (suggestion, target?) => {
  //   if(target && target.length === 0) return suggestions[target];
  //   if(!target) return suggestion;
  // }
  const getSuggestionValue = suggestion => suggestion.name;

  // prepare suggest logics
  const getSuggestions= <S extends string, T extends Record<string, unknown>>(inputValue: S, candidateList: T[]): T[] => {
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

  const handleOnSuggestionSelected = (_, data) => {
    /**
     * @NOTE
     * 候補を選択した際に以下2つの処理を同時に行う
     * 1. 選択したオブジェクトを選択用配列に格納
     * 2. input 上の入力値を clear
     */
    setSelectedValue([data.suggestion, ...selectedValue]);
    setInputValue('');
  }

  const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

  const inputProps = {
    placeholder: 'Type "ビ"',
    value: inputValue,
    onChange: (_, { newValue }) => {
      setInputValue(newValue);
    }
  };

  /**
   * -----------------------------------
   * selected form value display setting
   * -----------------------------------
   */
  const [selectedValue, setSelectedValue] = useState<FoodAndDrink[]>([]);

  const useDosage =(initialDosage = '') => {
    const [dosage, setDosage] = useState(initialDosage);
    const changedDosage = (e: ChangeEvent<HTMLInputElement>) => {
      setDosage(e.target.value);
    };
    return { dosage, setDosage, changedDosage };
  };

  const SelectedItem = ({ item }) => {
    const hasDosage = Object.keys(item).includes('dosage');
    const dosage = useDosage(hasDosage ? item.dosage : 0);

    if(hasDosage) {
      item.dosage = Number(dosage.dosage);
    }

    return (
      <fieldset>
        <legend>{item.name}</legend>
        {item.unit && (
          <div>
            <input value={dosage.dosage} onChange={dosage.changedDosage} /><span>{item.unit}</span>
          </div>
        )}
      </fieldset>
    );
  }

  const selectedList = selectedValue.map((value, index) => <SelectedItem key={index} item={value} />);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Suggest...</legend>
        <Controller
          name="suggest"
          control={control}
          render={() => (
            <Autosuggest
              // required props
              suggestions={suggestions}
              onSuggestionsFetchRequested={({ value }) => {
                setInputValue(value);
                setSuggestions(
                  getSuggestions(value, foodAndDrinkCandidates)
                );
              }}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              onSuggestionsClearRequested={() => setSuggestions([])}
              // options props
              onSuggestionSelected={handleOnSuggestionSelected}
            />
          )}
        />
        <span>
          {
            (suggestions.length === 0 && inputValue.length > 0) &&
            <button onClick={() => {
              setSelectedValue(
                [{ name: inputValue }, ...selectedValue]
              );
              setInputValue('');
            }}>追加</button>
          }
        </span>
      </fieldset>
      <div>
        {selectedValue.length > 0 && selectedList}
      </div>
      <button type="submit">登録</button>
    </form>
  )
}

export default SuggestForm;
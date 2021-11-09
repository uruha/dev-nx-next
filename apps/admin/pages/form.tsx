import { useForm, Controller, NestedValue, SubmitHandler } from 'react-hook-form';
import Autosuggest from 'react-autosuggest';
import { ChangeEvent, useState } from 'react';

import { BasicDataType, FoodAndDrink, foodAndDrinkCandidates, units } from '../lib/suggest-data';

import styles from './form.module.css';

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
    console.log(selectedItems.selectedItems);
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
  const getSuggestions= <T extends BasicDataType>(inputValue: string, candidateList: T[]): T[] => {
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
    selectedItems.add(data.suggestion);
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
  const useSelectedItems = <T extends BasicDataType>(initialState: T[] = []) => {
    const [selectedItems, setSelectedItems] = useState(initialState);

    const add = (item: T) => {
      setSelectedItems([item, ...selectedItems]);
    };

    const remove = (index: number) => {
      const removedItemList = selectedItems.filter((_, i) => index !== i);
      setSelectedItems(removedItemList);
    };

    return { selectedItems, add, remove };
  };

  const useDosage =(initialDosage = '0') => {
    const [dosage, setDosage] = useState(initialDosage);
    const changedDosage = (e: ChangeEvent<HTMLInputElement>) => {
      setDosage(e.target.value);
    };
    return { dosage, changedDosage };
  };

  const useUnit = (initialUnit = '') => {
    const [unit, setUnit] = useState(initialUnit);
    const changedUnit = (e: ChangeEvent<HTMLSelectElement>) => {
      setUnit(e.target.value);
    };
    return { unit, changedUnit };
  };

  const OptionalSelect = ({ units, item }: { units: string[], item: BasicDataType }) => {
    const unit = useUnit(item.unit);
    if(!item.isMaster) {
      item.unit = unit.unit;
    }
    
    return (
      <span>
        {units.length && (
          <select
            defaultValue={units[0]}
            onChange={unit.changedUnit}
          >
            {units.map((option, key) => (
              <option value={option} key={key}>{option}</option>
            ))}
          </select>
        )}
      </span>
    );
  };

  const SelectedItem = ({ item, listKey }: { item: BasicDataType, listKey: number }) => {
    const dosage = useDosage(item.dosage);
    item.dosage = dosage.dosage;

    return (
      <fieldset>
        <legend>{item.name}</legend>
        <div>
          <input value={dosage.dosage} onChange={dosage.changedDosage} />
          {
            item.isMaster
            ? <span>{item.unit}</span>
            : <OptionalSelect units={units} item={item} />
          }
          <button onClick={() => selectedItems.remove(listKey)}>削除</button>
        </div>
      </fieldset>
    );
  }

  const selectedItems = useSelectedItems<FoodAndDrink>([]);
  const selectedList = selectedItems.selectedItems.map((value, index) => <SelectedItem key={index} listKey={index} item={value} />);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Suggest...</legend>
        <div className={styles.suggest_container}>
          <div>
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
                      getSuggestions<FoodAndDrink>(value, foodAndDrinkCandidates)
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
          </div>
          <div>
            <button onClick={() => {
              // NOTE: 空白でも入力できるためバリデーションが必要
              selectedItems.add({
                name: inputValue,
                dosage: '0',
                unit: '',
                isMaster: false
              });
              setInputValue('');
            }}>追加</button>
          </div>
        </div>
      </fieldset>
      <div>
        {selectedItems.selectedItems.length > 0 && selectedList}
      </div>
      <button type="submit">登録</button>
    </form>
  )
}

export default SuggestForm;
import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { UseInputValue } from '../hooks/useInputValue';
import { UseSelectedItems } from '../hooks/useSelectedItems';
import { UseSelectedItemsForEffectMeasurement } from '../hooks/useSelectedItemsForEffectMeasurement';
import { ItemInformation } from '../libs/suggest-data';
import { getSuggestions, getSuggestionValue } from '../libs/suggest-utils';

type Props = {
  hookInputValue: UseInputValue;
  hookSelectedItems: UseSelectedItems | UseSelectedItemsForEffectMeasurement;
  candidate: ItemInformation[];
}

const AutosuggestForm: React.VFC<Props> = ({ hookInputValue, hookSelectedItems, candidate }) => {
  const [suggestions, setSuggestions] = useState<ItemInformation[]>([]);

  const handleOnSuggestionSelected = (_, data) => {
    /**
     * @NOTE
     * 候補を選択した際に以下2つの処理を同時に行う
     * 1. 選択したオブジェクトを選択用配列に格納
     * 2. input 上の入力値を clear
     */
     hookSelectedItems.add(data.suggestion);
     hookInputValue.updateValue('');
  }

  const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

  const inputProps = {
    placeholder: 'Type "ビ"',
    value: hookInputValue.value,
    onChange: (_, { newValue }) => {
      hookInputValue.updateValue(newValue);
    }
  };

  return (
    <>
      <Autosuggest
        // required props
        suggestions={suggestions}
        onSuggestionsFetchRequested={({ value }) => {
          hookInputValue.updateValue(value);
          setSuggestions(
            getSuggestions<ItemInformation>(value, candidate)
          );
        }}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionsClearRequested={() => setSuggestions([])}
        // options props
        onSuggestionSelected={handleOnSuggestionSelected}
      />
    </>
  )
};

export default AutosuggestForm;

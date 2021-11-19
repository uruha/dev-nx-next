import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { UseInputValue } from '../hooks/useInputValue';
import { UseSelectSuggestItem } from '../hooks/useSelectSuggestItem';
import { ItemInformation } from '../libs/suggest-data';
import { getSuggestions, getSuggestionValue } from '../libs/suggest-utils';

type Props = {
  hookInputValue: UseInputValue;
  hookUseSelectSuggestItem: UseSelectSuggestItem;
  candidate: ItemInformation[];
}

const SimpleAutosuggestForm: React.VFC<Props> = ({ hookInputValue, hookUseSelectSuggestItem, candidate }) => {
  const [suggestions, setSuggestions] = useState<ItemInformation[]>([]);

  const handleOnSuggestionSelected = (_, data) => {
    /**
     * @NOTE
     * 候補を選択した際に以下の処理を同時に行う
     * サジェストされたリストに対して選択しているものとして追加
     */
    hookUseSelectSuggestItem.add(data.suggestion);
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

export default SimpleAutosuggestForm;

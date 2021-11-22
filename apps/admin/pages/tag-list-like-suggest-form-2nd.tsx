import { FormEvent } from 'react';
import SimpleAutosuggestForm from '../src/components/SimpleAutosuggestForm';
import NameOnlyItem from '../src/components/NameOnlyItem';
import { useInputValue } from '../src/hooks/useInputValue';
import { useSelectSuggestItem } from '../src/hooks/useSelectSuggestItem';
import { useSelectedItems } from '../src/hooks/useSelectedItems';
import { itemCandidates, ItemInformation } from '../src/libs/suggest-data';

const TagListLikeLikeSuggestForm2nd = () => {
  const hookInputValue = useInputValue();
  const hookUseSelectSuggestItem = useSelectSuggestItem();
  const hookUseSelectedItems = useSelectedItems<ItemInformation>([]);

  const selectedItems = hookUseSelectedItems.selectedItems;
  const hasSelectedItems = selectedItems.length > 0;

  const isMaster = hookUseSelectSuggestItem.suggestItem.isMaster;
  const isSameName = hookUseSelectSuggestItem.suggestItem.name === hookInputValue.value;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedItems);
  };

  const handleRegister = () => {
    // NOTE: 空白でも入力できるためバリデーションが必要
    if(hookInputValue.value.length === 0) return;

    // NOTE: 候補に無いものは入力追加出来ない
    if(isMaster && isSameName) {
      hookUseSelectedItems.add(hookUseSelectSuggestItem.suggestItem);

      hookUseSelectSuggestItem.reset();
      hookInputValue.updateValue('');
    }
  }

  const selectedList = selectedItems.map(
    (item, index) => <NameOnlyItem
                      key={index}
                      listKey={index}
                      item={item}
                      hookSelectedItems={hookUseSelectedItems}
                    />
  );

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Suggest Food and Drink</legend>
        <div>
          <div>
            <SimpleAutosuggestForm
              hookInputValue={hookInputValue}
              hookUseSelectSuggestItem={hookUseSelectSuggestItem}
              candidate={itemCandidates}
            /> 
          </div>
          <div>
            <button type="button" onClick={handleRegister}>追加</button>
          </div>
        </div>
      </fieldset>
      <div>
        {hasSelectedItems && selectedList}
      </div>
      <button type="submit">登録</button>
    </form>
  );
};

export default TagListLikeLikeSuggestForm2nd;

import { FormEvent, useEffect } from 'react';
import SimpleAutosuggestForm from '../src/components/SimpleAutosuggestForm';
import CanBeEnteredItem from '../src/components/CanBeEnteredItem';
import { useInputValue } from '../src/hooks/useInputValue';
import { useSelectSuggestItem } from '../src/hooks/useSelectSuggestItem';
import { useSelectedItemsForEffectMeasurement } from '../src/hooks/useSelectedItemsForEffectMeasurement';
import { itemCandidates, UserItemInformation } from '../src/libs/suggest-data';

const TodoLikeSuggestForm2nd = () => {
  const hookInputValue = useInputValue();
  const hookUseSelectSuggestItem = useSelectSuggestItem();
  const hookUseSelectedItemsForEffectMeasurement = useSelectedItemsForEffectMeasurement<UserItemInformation>([]);

  const selectedItems = hookUseSelectedItemsForEffectMeasurement.selectedItems;
  const hasSelectedItems = selectedItems.length > 0;

  const isMaster = hookUseSelectSuggestItem.suggestItem.isMaster;
  const isSameName = hookUseSelectSuggestItem.suggestItem.name === hookInputValue.value;

  useEffect(() => {
    // NOTE: 一度候補を入れた後候補名を編集した場合、候補を handle する hook を reset する
    if(!isSameName) {
      hookUseSelectSuggestItem.reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ hookInputValue.value ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedItems);
  };

  const handleRegister = () => {
    // NOTE: 空白でも入力できるためバリデーションが必要
    if(hookInputValue.value.length === 0) return;

    // NOTE: input に入力されている値が候補から選択したものか判断
    if(isMaster && isSameName) {
      hookUseSelectedItemsForEffectMeasurement.add(hookUseSelectSuggestItem.suggestItem);

      hookUseSelectSuggestItem.reset();
      hookInputValue.updateValue('');
    } else {
      hookUseSelectedItemsForEffectMeasurement.add({
        name: hookInputValue.value,
        dosage: 0,
        unit: '',
        isMaster: false,
        effect: 'NoJudgment'
      });

      hookUseSelectSuggestItem.reset();
      hookInputValue.updateValue('');
    }
  }

  const selectedList = selectedItems.map(
    (item, index) => <CanBeEnteredItem
                      key={index}
                      listKey={index}
                      item={item}
                      hookSelectedItems={hookUseSelectedItemsForEffectMeasurement}
                    />
  );

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Suggest and Please feeling enter</legend>
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

export default TodoLikeSuggestForm2nd;

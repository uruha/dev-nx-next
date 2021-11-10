import { useForm, Controller } from 'react-hook-form';
import AutosuggestForm from '../src/components/Autosuggestion';
import CanBeEnteredItem from '../src/components/CanBeEnteredItem';
import { useInputValue } from '../src/hooks/useInputValue';
import { useSelectedItemsForEffectMeasurement } from '../src/hooks/useSelectedItemsForEffectMeasurement';
import { itemCandidates, UserItemInformation } from '../src/libs/suggest-data';

import styles from './form.module.css';

const TodoLikeSuggestForm = () => {
  const { handleSubmit } = useForm();
  const hookInputValue = useInputValue();
  const hookUseSelectedItemsForEffectMeasurement = useSelectedItemsForEffectMeasurement<UserItemInformation>([]);

  const selectedItems = hookUseSelectedItemsForEffectMeasurement.selectedItems;
  const hasSelectedItems = selectedItems.length > 0;

  const onSubmit = () => {
    console.log(selectedItems);
  };

  const selectedList = selectedItems.map(
    (item, index) => <CanBeEnteredItem
                      key={index}
                      listKey={index}
                      item={item}
                      hookSelectedItems={hookUseSelectedItemsForEffectMeasurement}
                    />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Suggest and Please feeling enter</legend>
        <div className={styles.suggest_container}>
          <div>
            <AutosuggestForm
              hookInputValue={hookInputValue}
              hookSelectedItems={hookUseSelectedItemsForEffectMeasurement}
              candidate={itemCandidates}
            /> 
          </div>
          <div>
            <button onClick={() => {
                // NOTE: 空白でも入力できるためバリデーションが必要
                hookUseSelectedItemsForEffectMeasurement.add({
                  name: hookInputValue.value,
                  dosage: 0,
                  unit: '',
                  isMaster: false,
                  effect: null
                });
                hookInputValue.updateValue('');
              }}>追加</button>
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

export default TodoLikeSuggestForm;

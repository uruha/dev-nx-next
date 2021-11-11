import { FormEvent } from 'react';
import AutosuggestForm from '../src/components/Autosuggestion';
import NameOnlyItem from '../src/components/NameOnlyItem';
import { useInputValue } from '../src/hooks/useInputValue';
import { useSelectedItems } from '../src/hooks/useSelectedItems';
import { itemCandidates, ItemInformation } from '../src/libs/suggest-data';

import styles from './form.module.css';

const TodoLikeSuggestForm = () => {
  const hookInputValue = useInputValue();
  const hookUseSelectedItems = useSelectedItems<ItemInformation>([]);

  const selectedItems = hookUseSelectedItems.selectedItems;
  const hasSelectedItems = selectedItems.length > 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedItems);
  };

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
        <div className={styles.suggest_container}>
          <div>
            <AutosuggestForm
              hookInputValue={hookInputValue}
              hookSelectedItems={hookUseSelectedItems}
              candidate={itemCandidates}
            /> 
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

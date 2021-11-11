import { KeyboardEvent, useEffect } from 'react';
import { UseSelectedItemsForEffectMeasurement } from '../hooks/useSelectedItemsForEffectMeasurement';
import { units, UserItemInformation } from "../libs/suggest-data";
import OptionalSelect from "./OptionalSelect";

type Props = {
  item: UserItemInformation;
  listKey: number;
  hookSelectedItems: UseSelectedItemsForEffectMeasurement;
};

const CanBeEnteredItem: React.VFC<Props> = ({ item, listKey, hookSelectedItems }) => {
  return (
    <fieldset>
      <legend>{item.name}</legend>
      <div>
        <input
          type="text"
          value={`${item.dosage}`}
          onChange={e => hookSelectedItems.updateDosage(listKey, e)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
        />
        {
          item.isMaster
          ? <span>{item.unit}</span>
          : <OptionalSelect
              listKey={listKey}
              units={units}
              hookSelectedItems={hookSelectedItems}
            />
        }
        <button type="button" onClick={() => hookSelectedItems.remove(listKey)}>削除</button>
      </div>
      <fieldset>
        <legend>美味しかった？</legend>
        <label>
          <input
            type="radio"
            value="yes"
            onChange={e => hookSelectedItems.selectEffect(listKey, e)}
            checked={item.effect === 'Yes'}
          />
          はい
        </label>
        <label>
          <input
            type="radio"
            value="no"
            onChange={e => hookSelectedItems.selectEffect(listKey, e)}
            checked={item.effect === 'No'}
          />
          いいえ
        </label>
      </fieldset>
    </fieldset>
  );
}

export default CanBeEnteredItem;

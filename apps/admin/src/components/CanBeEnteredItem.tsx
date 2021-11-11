import { useDosage } from "../hooks/useDosage";
import { useFeeling } from "../hooks/useFeeling";
import { UseSelectedItemsForEffectMeasurement, useSelectedItemsForEffectMeasurement } from '../hooks/useSelectedItemsForEffectMeasurement';
import { units, UserItemInformation } from "../libs/suggest-data";
import OptionalSelect from "./OptionalSelect";

type Props = {
  item: UserItemInformation;
  listKey: number;
  hookSelectedItems: UseSelectedItemsForEffectMeasurement;
};

const CanBeEnteredItem: React.VFC<Props> = ({ item, listKey, hookSelectedItems }) => {
  const hookUseDosage = useDosage(`${item.dosage}`);
  item.dosage = Number(hookUseDosage.dosage);

  const hookUseFeeling = useFeeling();
  switch (hookUseFeeling.effect) {
    case 'yes':
      item.effect = true;
      break;
    case 'no':
      item.effect = false;
      break;
    default:
      item.effect = null;
  }

  return (
    <fieldset>
      <legend>{item.name}</legend>
      <div>
        <input type="text" value={hookUseDosage.dosage} onChange={hookUseDosage.changedDosage} />
        {
          item.isMaster
          ? <span>{item.unit}</span>
          : <OptionalSelect units={units} item={item} />
        }
        <button type="button" onClick={() => hookSelectedItems.remove(listKey)}>削除</button>
      </div>
      <fieldset>
        <legend>美味しかった？</legend>
        <label>
          <input
            type="radio"
            value="yes"
            onChange={hookUseFeeling.selectEffect}
            checked={hookUseFeeling.effect === 'yes'}
          />
          はい
        </label>
        <label>
          <input
            type="radio"
            value="no"
            onChange={hookUseFeeling.selectEffect}
            checked={hookUseFeeling.effect === 'no'}
          />
          いいえ
        </label>
      </fieldset>
    </fieldset>
  );
}

export default CanBeEnteredItem;

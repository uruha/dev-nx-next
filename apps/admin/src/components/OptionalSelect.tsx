import { UseSelectedItemsForEffectMeasurement } from "../hooks/useSelectedItemsForEffectMeasurement";
import { selectUnits } from "../libs/suggest-data";

type Props = {
  listKey: number;
  units: typeof selectUnits;
  hookSelectedItems: UseSelectedItemsForEffectMeasurement;
};

const OptionalSelect: React.VFC<Props> = ({ listKey, units, hookSelectedItems }) => {
  return (
    <span>
      {units.length && (
        <select
          defaultValue={units[0]}
          onChange={e => hookSelectedItems.selectUnit(listKey ,e)}
        >
          {units.map((option, key) => (
            <option value={option} key={key}>{option}</option>
          ))}
        </select>
      )}
    </span>
  );
};

export default OptionalSelect;

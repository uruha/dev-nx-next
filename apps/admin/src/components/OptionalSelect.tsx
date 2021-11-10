import { useUnit } from "../hooks/useUnit";
import { ItemInformation, selectUnits } from "../libs/suggest-data";

type Props = {
  units: typeof selectUnits;
  item: ItemInformation;
};

const OptionalSelect: React.VFC<Props> = ({ units, item }) => {
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

export default OptionalSelect;

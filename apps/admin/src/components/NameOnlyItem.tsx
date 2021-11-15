import { UseSelectedItems } from '../hooks/useSelectedItems';
import { ItemInformation } from "../libs/suggest-data";

type Props = {
  item: ItemInformation;
  listKey: number;
  hookSelectedItems: UseSelectedItems;
};

const NameOnlyItem: React.VFC<Props> = ({ item, listKey, hookSelectedItems }) => {
  return (
    <fieldset>
      <span>{item.name}:{` `}</span>
      <span>
        <button type="button" onClick={() => hookSelectedItems.remove(listKey)}>削除</button>
      </span>
    </fieldset>
  );
}

export default NameOnlyItem;

import { useState } from "react";
import { UserItemInformation } from "../libs/suggest-data";

export type UseSelectedItemsForEffectMeasurement = {
  selectedItems: UserItemInformation[];
  add: (item: UserItemInformation) => void;
  remove: (index: number) => void;
};

export const useSelectedItemsForEffectMeasurement = <T extends UserItemInformation>(initialState: T[] = []): UseSelectedItemsForEffectMeasurement => {
  const [selectedItems, setSelectedItems] = useState(initialState);

  const add = (item: T) => {
    item.effect = null;
    setSelectedItems([item, ...selectedItems]);
  };

  const remove = (index: number) => {
    const removedItemList = selectedItems.filter((_, i) => index !== i);
    setSelectedItems(removedItemList);
  };

  return { selectedItems, add, remove };
};

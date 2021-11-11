import { ChangeEvent, useState } from "react";
import { UserItemInformation } from "../libs/suggest-data";

export type UseSelectedItemsForEffectMeasurement = {
  selectedItems: UserItemInformation[];
  add: (item: UserItemInformation) => void;
  remove: (index: number) => void;
  updateDosage: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
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

  const updateDosage = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const list = [...selectedItems];
    list[index]['dosage'] = Number(e.target.value);
    setSelectedItems(list);
  };

  return { selectedItems, add, remove, updateDosage };
};

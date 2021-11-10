import { useState } from "react";
import { ItemInformation, UserItemInformation } from "../libs/suggest-data";

export type UseSelectedItems = {
  selectedItems: ItemInformation[];
  add: (item: ItemInformation) => void;
  remove: (index: number) => void;
};

export const useSelectedItems = <T extends UserItemInformation>(initialState: T[] = []): UseSelectedItems => {
  const [selectedItems, setSelectedItems] = useState(initialState);

  const add = (item: T) => {
    setSelectedItems([item, ...selectedItems]);
  };

  const remove = (index: number) => {
    const removedItemList = selectedItems.filter((_, i) => index !== i);
    setSelectedItems(removedItemList);
  };

  return { selectedItems, add, remove };
};

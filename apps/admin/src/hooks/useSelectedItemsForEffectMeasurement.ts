import { ChangeEvent, useState } from "react";
import { UserItemInformation } from "../libs/suggest-data";

export type UseSelectedItemsForEffectMeasurement = {
  selectedItems: UserItemInformation[];
  add: (item: UserItemInformation) => void;
  remove: (index: number) => void;
  updateDosage: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
  selectEffect: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
  selectUnit: (index: number, e: ChangeEvent<HTMLSelectElement>) => void;
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
      list[index]['dosage'] = parseInt(e.target.value, 10) || 0;
      setSelectedItems(list);
  };

  const selectEffect = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const list = [...selectedItems];
    switch (e.target.value) {
      case 'yes':
        list[index]['effect'] = 'Yes';
        break;
      case 'no':
        list[index]['effect'] = 'No';
        break;
      default:
        list[index]['effect'] = 'NoJudgment';
    }
    setSelectedItems(list);
  };

  const selectUnit = (index: number, e: ChangeEvent<HTMLSelectElement>) => {
    const list = [...selectedItems];
    if(!list[index]['isMaster']) {
      list[index]['unit'] = e.target.value;
      setSelectedItems(list);
    }
  };

  return { selectedItems, add, remove, updateDosage, selectEffect, selectUnit };
};

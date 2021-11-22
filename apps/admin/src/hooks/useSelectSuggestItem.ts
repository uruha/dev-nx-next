import { useState } from "react";
import { UserItemInformation } from "../libs/suggest-data";

export type UseSelectSuggestItem = {
  suggestItem: UserItemInformation;
  add: (item: UserItemInformation) => void;
  reset: () => void;
};

const initialItem: UserItemInformation = {
  id: '',
  name: '',
  dosage: 0,
  unit: '',
  isMaster: false,
  effect: 'NoJudgment'
}

/**
 * NOTE:
 * 候補から任意のものを選択して一時的に state に永続化する hooks
 * 候補から選択されたオブジェクトを扱う場合はこちらの suggestItem を使用する
 */
export const useSelectSuggestItem = (initialState = initialItem): UseSelectSuggestItem => {
  const [suggestItem, setSuggestItem] = useState(initialState);

  const add = (item: UserItemInformation) => {
    setSuggestItem(item);
  };

  const reset = () => {
    setSuggestItem(initialItem);
  }

  return { suggestItem, add, reset };
};

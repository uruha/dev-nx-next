import { useState } from "react";

export type UseInputValue = {
  value: string;
  updateValue: (inputValue: string) => void;
};

export const useInputValue = (initialValue = ''): UseInputValue => {
  const [value, setValue] = useState(initialValue);

  const updateValue = (inputValue: string) => {
    setValue(inputValue);
  };

  return { value, updateValue };
};

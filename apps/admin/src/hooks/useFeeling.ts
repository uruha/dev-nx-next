import { ChangeEvent, useState } from "react";

export const useFeeling = () => {
  const [effect, setEffect] = useState(null);
  const selectEffect = (e: ChangeEvent<HTMLInputElement>) => {
    setEffect(e.target.value);
  };

  return { effect, selectEffect };
};

import { ChangeEvent, useState } from "react";

export const useDosage = (initialDosage = '0') => {
  const [dosage, setDosage] = useState(initialDosage);
  const changedDosage = (e: ChangeEvent<HTMLInputElement>) => {
    setDosage(e.target.value);
  };
  return { dosage, changedDosage };
};

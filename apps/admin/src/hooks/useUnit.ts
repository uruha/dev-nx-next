import { ChangeEvent, useState } from "react";

export const useUnit = (initialUnit = '') => {
  const [unit, setUnit] = useState(initialUnit);
  const changedUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value);
  };
  return { unit, changedUnit };
};

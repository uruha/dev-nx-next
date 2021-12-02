import { useState } from 'react';

export type UseCarryData = {
  selectedData: any;
  select: (data: any) => void;
};

export const useCarryData = (): UseCarryData => {
  const [selectedData, setData] = useState<any>({});

  const select = (data) => {
    console.log(data);
    setData(data);
  };

  return { selectedData, select };
};
export type FoodAndDrink = {
  id?: number;
  name: string;
  dosage?: number | null;
  unit?: string;
}

export const foodAndDrink: FoodAndDrink[] = [
  {
    id: 1,
    name: 'ビール',
    dosage: null,
    unit: 'パイント'
  },
  {
    id: 2,
    name: 'ピザ',
    dosage: null,
    unit: 'piece'
  },
  {
    id: 3,
    name: 'ごはん',
    dosage: null,
    unit: '杯'
  },
  {
    id: 4,
    name: 'びーるおぶびーる',
    dosage: null,
    unit: 'パイント'
  },
  {
    id: 5,
    name: 'Beer',
    dosage: null,
    unit: 'Pint'
  },
  {
    id: 6,
    name: 'ビール 350mL',
    dosage: null,
    unit: 'パイント'
  },
];

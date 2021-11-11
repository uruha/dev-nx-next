// PoC
export interface BasicDataType {
  id?: number;
  name: string;
  dosage: string;
  unit: string;
  isMaster: boolean;
}

export type FoodAndDrink = BasicDataType;
export const units = ['パイント', 'piece', '杯', 'Pint'];
export const foodAndDrinkCandidates: FoodAndDrink[] = [
  {
    id: 1,
    name: 'ビール',
    dosage: '0',
    unit: 'パイント',
    isMaster: true
  },
  {
    id: 2,
    name: 'ピザ',
    dosage: '0',
    unit: 'piece',
    isMaster: true
  },
  {
    id: 3,
    name: 'ごはん',
    dosage: '0',
    unit: '杯',
    isMaster: true
  },
  {
    id: 4,
    name: 'びーるおぶびーる',
    dosage: '0',
    unit: 'パイント',
    isMaster: true
  },
  {
    id: 5,
    name: 'Beer',
    dosage: '0',
    unit: 'Pint',
    isMaster: true
  },
  {
    id: 6,
    name: 'ビール 350mL',
    dosage: '0',
    unit: 'パイント',
    isMaster: true
  },
];

// update PoC
export interface ItemInformation {
  id?: string;
  name: string;
  dosage: number;
  unit: string;
  isMaster: boolean;
}

export interface UserItemInformation extends ItemInformation {
  effect: 'Yes' | 'No' | 'NoJudgment';
}

export const selectUnits = ['パイント', 'piece', '杯', 'Pint'];
export const itemCandidates: ItemInformation[] = [
  {
    id: '1',
    name: 'ビール',
    dosage: 0,
    unit: 'パイント',
    isMaster: true
  },
  {
    id: '2',
    name: 'ピザ',
    dosage: 0,
    unit: 'piece',
    isMaster: true
  },
  {
    id: '3',
    name: 'ごはん',
    dosage: 0,
    unit: '杯',
    isMaster: true
  },
  {
    id: '4',
    name: 'びーるおぶびーる',
    dosage: 0,
    unit: 'パイント',
    isMaster: true
  },
  {
    id: '5',
    name: 'Beer',
    dosage: 0,
    unit: 'Pint',
    isMaster: true
  },
  {
    id: '6',
    name: 'ビール 350mL',
    dosage: 0,
    unit: 'パイント',
    isMaster: true
  },
];
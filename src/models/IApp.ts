export interface IBalance {
  balance: number;
}

export interface IStepsPerDay {
  id: number;
  quantiny: number;
  date: string;
}

export interface IStepsPerWeekAndMonth {
  [key: number]: {
    [key: number]: number;
  };
}

export interface IStepsPerMonth {
  "2022": {
    "50": 150;
  };
}

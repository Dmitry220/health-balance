export interface IBalance {
  balance: number;
}

export interface IStepsPerDay {
  id: number;
  quantiny: number;
  date: string;
}

export interface IStepsPerWeek {
  [key: number]: {
    [key: number]: number;
  };
}

export interface IStepsPerMonth {
  [key: number]: {
    [key: number]: number;
  };
}

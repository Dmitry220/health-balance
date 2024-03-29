export interface IBalance {
  balance: number;
}

export interface IStepsPerDay {
  id: number;
  quantity: number;
  date: number;
  finished: boolean,
  day: string
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

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import AppService from "../../services/AppService";
import {
  IBalance,
  IStepsPerDay,
  IStepsPerMonth,
} from "../../models/IApp";

const weekNow = new Date().getDay();

interface AppState {
  balance: number;
  steps: IStepsPerDay[] | [];
  daysWeek: {
    id: number;
    quantiny: number;
    date: string;
    title: string;
  }[];
  month: {
    id: number;
    title: string;
    count: number;
  }[];
  stepsWeekAndMonth: {};
  weeks: {
    id: number,
    date: string,
    count: number
  }[]
}

const initialState: AppState = {
  balance: 0,
  steps: [],
  daysWeek: [
    {
      id: 1,
      quantiny: 0,
      date: "",
      title: "Пн",
    },
    {
      id: 2,
      quantiny: 0,
      date: "",
      title: "Вт",
    },
    {
      id: 3,
      quantiny: 0,
      date: "",
      title: "Ср",
    },
    {
      id: 4,
      quantiny: 0,
      date: "",
      title: "Чт",
    },
    {
      id: 5,
      quantiny: 0,
      date: "",
      title: "Пт",
    },
    {
      id: 6,
      quantiny: 0,
      date: "",
      title: "Сб",
    },
    {
      id: 7,
      quantiny: 0,
      date: "",
      title: "Вс",
    },
  ],
  month: [
    {
      id: 1,
      title: "Янв",
      count: 0,
    },
    {
      id: 2,
      title: "Фев",
      count: 0,
    },
    {
      id: 3,
      title: "Мар",
      count: 0,
    },
    {
      id: 4,
      title: "Апр",
      count: 0,
    },
    {
      id: 5,
      title: "Май",
      count: 0,
    },
    {
      id: 6,
      title: "Июн",
      count: 0,
    },
    {
      id: 7,
      title: "Июл",
      count: 0,
    },
    {
      id: 8,
      title: "Авг",
      count: 0,
    },
    {
      id: 9,
      title: "Сен",
      count: 0,
    },
    {
      id: 10,
      title: "Окт",
      count: 0,
    },
    {
      id: 11,
      title: "Ноя",
      count: 0,
    },
    {
      id: 12,
      title: "Дек",
      count: 0,
    },
  ],
  stepsWeekAndMonth: 5,
  weeks: [
    {
      id: 1,
      count: 0,
      date: ''
    },
    {
      id: 2,
      count: 0,
      date: ''
    },
    {
      id: 3,
      count: 0,
      date: ''
    },
    {
      id: 4,
      count: 0,
      date: ''
    },
    {
      id: 5,
      count: 0,
      date: ''
    },
    {
      id: 6,
      count: 0,
      date: ''
    },
    {
      id: 7,
      count: 0,
      date: ''
    },
  ]
};

export const getBalance = createAsyncThunk("balance", async () => {
  const response = await AppService.getBalance();
  return response.data.data.balance;
});

export const getStepsPerDay = createAsyncThunk(
  "getStepsPerDay",
  async (data: any) => {
    const { start_date, end_date } = data;
    const response = await AppService.getStepsPerDay(start_date, end_date);
    return response.data.data;
  }
);

export const getStepsPerWeek = createAsyncThunk(
  "getStepsPerWeek",
  async (data: any) => {
    const { start_date, end_date, type } = data;
    const response = await AppService.getStepsPerWeekAndMonth(
      start_date,
      end_date,
      type
    );
    return response.data.data;
  }
);
export const getStepsPerMonth = createAsyncThunk(
  "getStepsPerMonth",
  async (data: any) => {
    const { start_date, end_date, type } = data;
    const response = await AppService.getStepsPerWeekAndMonth(
      start_date,
      end_date,
      type
    );
    return response.data.data;
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActualStepsbyWeek: (state, action: PayloadAction<IStepsPerDay>) => {
      state.daysWeek = state.daysWeek.map((label) =>
        label.date === action.payload.date
          ? { ...label, quantiny: action.payload.quantiny }
          : label
      );
    },
    setDaysWeek: (state) => {
      let a = 0;
      let b = 0;
      state.daysWeek = state.daysWeek.map((item, i) => {
        if (weekNow <= item.id) {
          a++;
          return {
            ...item,
            date: new Date(
              new Date().setDate(new Date().getDate() + (a - 1))
            ).toLocaleDateString(),
          };
        } else {
          b++;
          return {
            ...item,
            date: new Date(
              new Date().setDate(new Date().getDate() - (7 - b - 1))
            ).toLocaleDateString(),
          };
        }
      });
    },
    setMonth: (state) => {
      console.log(state.stepsWeekAndMonth);
      
      let array = state.stepsWeekAndMonth ? Object.values(state.stepsWeekAndMonth) : null;      
      array && array.forEach((year: any, i) => {
        Object.keys(year).map((month: any, index: number) => {     
          state.month = state.month.map((label) =>
            label.id === +month
              ? { ...label, count: Number(Object.values(year)[index]) }
              : label
          );
        });
      });
    },
    setWeeks: (state) => {

      let a = 0;
      let b = 0;
      let weekNow = 50
      let array = Object.values(state.stepsWeekAndMonth);     

     
      array.length && array.forEach((year: any, i) => {
        Object.keys(year).map((week: any, index: number) => {     
          state.weeks = state.weeks.map((item, i) => {  
            if (weekNow <= +week) {
              //weekNow++
              a++;                 
              return {
                ...item,
                date: new Date(
                  new Date().setDate(new Date().getDate() + (a- 1)*7)
                ).toLocaleDateString().slice(0,-5),
                count:  Number(Object.values(year)[index])
              };
            } else {
              b++;
              return {
                ...item,
                date: new Date(
                  new Date().setDate(new Date().getDate() - ((b- 1)*7))
                ).toLocaleDateString().slice(0,-5),
                count: 0
              };
            }
          });
        });
      });
    },
    setActualStepsbyWeeks: (state) => {
      state.daysWeek = state.daysWeek.map((label) =>
        label.date === 'action.payload.date'
          ? { ...label, quantiny: 4 }
          : label
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.balance = action.payload;
    });
    builder.addCase(
      getStepsPerDay.fulfilled,
      (state, action: PayloadAction<IStepsPerDay[]>) => {
        state.steps = action.payload;
      }
    );
    builder.addCase(getStepsPerMonth.fulfilled, (state, action) => {
      state.stepsWeekAndMonth = action.payload;
    });
  },
});

export const { setDaysWeek, setActualStepsbyWeek, setMonth,setWeeks } = appSlice.actions;

export const balanceSelector = (state: RootState) => state.app.balance;
export const stepsPerDaySelector = (state: RootState) => state.app.steps;
export const stepsPerWeekAndMonthSelector = (state: RootState) =>
  state.app.stepsWeekAndMonth;
export const daysWeekSelector = (state: RootState) => state.app.daysWeek;
export const monthSelector = (state: RootState) => state.app.month;
export const weeksSelector = (state: RootState) => state.app.weeks;

export default appSlice.reducer;

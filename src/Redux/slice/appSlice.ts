import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import AppService from "../../services/AppService";
import { IBalance, IStepsPerDay, IStepsPerMonth } from "../../models/IApp";
import { getWeek } from "../../utils/common-functions";

let weekNow = new Date().getDay();

interface AppState {
  balance: number;
  currentStepsCount: number
  steps: IStepsPerDay[] | [];
  daysWeek: {
    id: number;
    quantity: number;
    date: string;
    title: string;
    finished: null | number
  }[];
  month: {
    id: number;
    title: string;
    count: number;
  }[];
  stepsWeekAndMonth: {};
  weekData: {};
  weeks: {
    id: number;
    date: string;
    count: number;
    numberWeek: number,
    year: number | null
  }[];
}

const initialState: AppState = {
  balance: 0,
  currentStepsCount: 0,
  steps: [],
  daysWeek: [
    {
      id: 1,
      quantity: 0,
      date: "",
      title: "Пн",
      finished: null
    },
    {
      id: 2,
      quantity: 0,
      date: "",
      title: "Вт",
      finished: null
    },
    {
      id: 3,
      quantity: 0,
      date: "",
      title: "Ср",
      finished: null
    },
    {
      id: 4,
      quantity: 0,
      date: "",
      title: "Чт",
      finished: null
    },
    {
      id: 5,
      quantity: 0,
      date: "",
      title: "Пт",
      finished: null
    },
    {
      id: 6,
      quantity: 0,
      date: "",
      title: "Сб",
      finished: null
    },
    {
      id: 7,
      quantity: 0,
      date: "",
      title: "Вс",
      finished: null
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
      numberWeek: 0,
      year: null,
      date: "",
    },
    {
      id: 2,
      count: 0,
      numberWeek: 0,
      year: null,
      date: "",
    },
    {
      id: 3,
      count: 0,
      numberWeek: 0,
      year: null,
      date: "",
    },
    {
      id: 4,
      count: 0,
      numberWeek: 0,
      year: null,
      date: "",
    },
    {
      id: 5,
      count: 0,
      numberWeek: 0,
      year: null,
      date: "",
    },
    {
      id: 6,
      count: 0,
      numberWeek: 0,
      year: null,
      date: "",
    },
    {
      id: 7,
      count: 0,
      numberWeek: 0,
      year: null,
      date: "",
    },
  ],
  weekData: {},
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
          ? { ...label, quantiny: action.payload.quantity, finished:action.payload.finished}
          : label
      );
    },
    setCurrentStepsCount(state, action){
      state.currentStepsCount = action.payload
    },
    setDaysWeek: (state) => {
      let a = 0;
      let b = 0;
      state.daysWeek = state.daysWeek.map((item, i) => {
        if (weekNow != 0) {
          if (weekNow <= item.id) {
            a++;
            return {
              ...item,
              date: new Date(
                new Date().setDate(new Date().getDate() + (a - 1))
              ).toLocaleDateString(),
            };
          } else {                
            return {
              ...item,
              date: new Date(
                new Date().setDate(new Date().getDate() - (weekNow - item.id))
              ).toLocaleDateString(),
            };
          }
        } else {
          b++;
          return {
            ...item,
            date: new Date(
              new Date().setDate(new Date().getDate() - (7 - b))
            ).toLocaleDateString(),
          };
       }
      });
    },
    setMonth: (state) => {
      console.log(state.stepsWeekAndMonth);

      let array = state.stepsWeekAndMonth
        ? Object.values(state.stepsWeekAndMonth)
        : null;
      array &&
        array.forEach((year: any, i) => {
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
      let weekNow = getWeek(new Date());
      console.log(weekNow[1]);      
      let array = state.weekData
      ? Object.values(state.weekData)
      : null;

      array &&array.length &&
        array.forEach((year: any, i) => {
          Object.keys(year).map((week: any, index: number) => {
            state.weeks = state.weeks.map((item, indexWeek) => {
              let dateWeekNow = new Date(
                state.daysWeek[0].date.slice(3, -5) +                
                  "." +
                  state.daysWeek[0].date.slice(0, -8) +
                  "." +
                  state.daysWeek[0].date.slice(-4)
              );
              
              console.log(state.daysWeek[0].date.slice(0, -8) +
              "." +
              state.daysWeek[0].date.slice(3, -5) +
              "." +
              state.daysWeek[0].date.slice(-4));
              
                                

              return {
                ...item,
                date: new Date(dateWeekNow.setDate(dateWeekNow.getDate() - 7 * indexWeek)).toLocaleDateString().slice(0, -5),               
                numberWeek: weekNow[1] - indexWeek <= 0 ? 52- (indexWeek-weekNow[1])  : weekNow[1] - indexWeek,
                count: (weekNow[1] - indexWeek <= 0 ? 52- (indexWeek-weekNow[1])  : weekNow[1] - indexWeek) === Number(Object.keys(year)[0]) ? Number(Object.values(year)[index]) : 0,
              };
            }).reverse();
          });
        });
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
    builder.addCase(getStepsPerWeek.fulfilled, (state, action) => {
      state.weekData = action.payload;
    });
  },
});

export const { setDaysWeek, setActualStepsbyWeek, setMonth, setWeeks,setCurrentStepsCount } =
  appSlice.actions;

export const balanceSelector = (state: RootState) => state.app.balance;
export const stepsPerDaySelector = (state: RootState) => state.app.steps;
export const stepsPerWeekAndMonthSelector = (state: RootState) =>
  state.app.stepsWeekAndMonth;
export const daysWeekSelector = (state: RootState) => state.app.daysWeek;
export const monthSelector = (state: RootState) => state.app.month;
export const weeksSelector = (state: RootState) => state.app.weeks;
export const currentStepsCountSelector = (state: RootState) => state.app.currentStepsCount;

export default appSlice.reducer;

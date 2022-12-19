import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import AppService from "../../services/AppService";
import { IBalance, IStepsPerDay, IStepsPerMonth } from "../../models/IApp";
import { getWeek } from "../../utils/common-functions";

let weekNow = new Date().getDay();

interface AppState {
  balance: number;
  currentStepsCount: number;
  steps: IStepsPerDay[] | [];
  days: {
    id: number;
    quantity: number;
    date: number;
    title: string;
    finished: null | number;
  }[];
  months: {
    id: number;
    title: string;
    count: number;
  }[];
  weeks: {
    id: number;
    date: string;
    count: number;
    numberWeek: number;
    year: number | null;
  }[];
  monthData: {};
  weekData: {};
 
}

const initialState: AppState = {
  balance: 0,
  currentStepsCount: 0,
  steps: [],
  days: [
    {
      id: 1,
      quantity: 0,
      date: 0,
      title: "Пн",
      finished: null,
    },
    {
      id: 2,
      quantity: 0,
      date: 0,
      title: "Вт",
      finished: null,
    },
    {
      id: 3,
      quantity: 0,
      date: 0,
      title: "Ср",
      finished: null,
    },
    {
      id: 4,
      quantity: 0,
      date: 0,
      title: "Чт",
      finished: null,
    },
    {
      id: 5,
      quantity: 0,
      date: 0,
      title: "Пт",
      finished: null,
    },
    {
      id: 6,
      quantity: 0,
      date: 0,
      title: "Сб",
      finished: null,
    },
    {
      id: 7,
      quantity: 0,
      date: 0,
      title: "Вс",
      finished: null,
    },
  ],
  months: [
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
  monthData: {},
 
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
      state.days = state.days.map((label) =>  
        label.date === action.payload.date
          ? {
              ...label,
              quantity: action.payload.quantity,
              finished: action.payload.finished,
            }
          : label
      );
    },
    setCurrentStepsCount(state, action) {
      state.currentStepsCount = action.payload;
    },
    setDaysWeek: (state) => {
      state.days = state.days.map(item => {
        if (weekNow != 0) {
          if (weekNow <= item.id) {            
            return {
              ...item,
              date:
                new Date(
                  new Date().setDate(new Date().getDate() + (item.id - weekNow))
                ).setHours(0, 0, 0, 0) / 1000,
            };
          } else {
            return {
              ...item,
              date:
                new Date(
                  new Date().setDate(new Date().getDate() - (weekNow - item.id))
                ).setHours(0, 0, 0, 0) / 1000,
            };
          }
        } else {         
          return {
            ...item,
            date:
              new Date(
                new Date().setDate(new Date().getDate() - (7 - item.id))
              ).setHours(0, 0, 0, 0) / 1000,
          };
        }
      });
    },
    setMonths: (state) => {    
      let array = state.monthData
        ? Object.values(state.monthData)
        : null;
      array &&
        array.forEach((year: any, i) => {
          Object.keys(year).map((month: any, index: number) => {
            state.months = state.months.map((label) =>
              label.id === +month
                ? { ...label, count: Number(Object.values(year)[index]) }
                : label
            );
          });
        });
    },
    setWeeks: (state) => {
      let weekNow = getWeek(new Date());
      let array = state.weekData ? Object.values(state.weekData) : null;
      array &&
        array.length &&
        array.forEach((year: any, i) => {
          Object.keys(year).map((week: any, index: number) => {
            state.weeks = state.weeks.map((item, indexWeek) => {
              let dateWeekNow = new Date(state.days[0].date * 1000);
              let numberWeek =
                weekNow[1] - indexWeek <= 0
                  ? 52 - (indexWeek - weekNow[1])
                  : weekNow[1] - indexWeek;
              return {
                ...item,
                date: new Date(
                  dateWeekNow.setDate(dateWeekNow.getDate() - 7 * indexWeek)
                )
                  .toLocaleDateString()
                  .slice(0, -5),
                numberWeek: numberWeek,
                count:
                  numberWeek === +Object.keys(year)[index]
                    ? Number(Object.values(year)[index])
                    : item.count,
              };
            });
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
    builder.addCase(getStepsPerDay.rejected, (state, action) => {
      state.steps = [];
    });
    builder.addCase(getStepsPerMonth.fulfilled, (state, action) => {      
      state.monthData = action.payload 
    });
    builder.addCase(getStepsPerWeek.fulfilled, (state, action) => {
      state.weekData = action.payload;
    });
  },
});

export const {
  setDaysWeek,
  setActualStepsbyWeek,
  setMonths,
  setWeeks,
  setCurrentStepsCount,
} = appSlice.actions;

export const balanceSelector = (state: RootState) => state.app.balance;
export const stepsPerDaySelector = (state: RootState) => state.app.steps;
export const daysSelector = (state: RootState) => state.app.days;
export const monthsSelector = (state: RootState) => state.app.months;
export const weeksSelector = (state: RootState) => state.app.weeks;
export const currentStepsCountSelector = (state: RootState) =>
  state.app.currentStepsCount;

export default appSlice.reducer;

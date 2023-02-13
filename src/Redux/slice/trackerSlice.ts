import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICreatingTracker, IGetTracker, ITrack } from "../../models/ITracker";
import TrackerService from "../../services/TrackerService";

const END_DATE = new Date();
END_DATE.setDate(END_DATE.getDate() + 3);

export interface ITracker {
  creatingTracker: ICreatingTracker;
  tracker: IGetTracker;
  isLoading: boolean;
  countWater: number;
  isChangeTrack: boolean;
  datesSleep: {
    id: number;
    day: string;
    date: Date;
  }[];
  tracks:{
    waterTrack: ITrack[],
    sleepTrack: ITrack[],
    fruitTrack: ITrack[]
  }
}

const initialState: ITracker = {
  creatingTracker: { fruits: 0, weight: 60, wake_up_time: "06:20" },
  tracker: { id: 0, fruits: 0, weight: 60, wake_up_time: "06:20" },
  isLoading: false,
  countWater: 0,
  isChangeTrack: true,
  datesSleep: [
    {
      id: 1,
      day: "Пн",
      date: new Date(),
    },
    {
      id: 2,
      day: "Вт",
      date: new Date(),
    },
    {
      id: 3,
      day: "Ср",
      date: new Date(),
    },
    {
      id: 4,
      day: "Чт",
      date: new Date(),
    },
    {
      id: 5,
      day: "Пт",
      date: new Date(),
    },
    {
      id: 6,
      day: "Сб",
      date: new Date(),
    },
    {
      id: 7,
      day: "Вс",
      date: new Date(),
    }
  ],
  tracks: {
    fruitTrack: [],
    sleepTrack: [],
    waterTrack: []
  }
};

export const creatingTracker = createAsyncThunk<unknown>(
  "creatingTracker",
  async (arg, { getState }) => {
    const state: any = getState();
    const formData = new FormData();
    formData.append("wake_up_time", state.tracker.creatingTracker.wake_up_time);
    formData.append("weight", state.tracker.creatingTracker.weight);
    formData.append("fruits", state.tracker.creatingTracker.fruits);
    await TrackerService.creatingTracker(formData);
  }
);

export const getTracker = createAsyncThunk("getTracker", async () => {
  const response = await TrackerService.getTracker();
  return response.data.data;
});

export const getTracks = createAsyncThunk("getTracks", async (date:string) => {
  const response = await TrackerService.getTracks(date);
  return response.data.data;
});

export const trackerSlice = createSlice({
  name: "trackerSlice",
  initialState,
  reducers: {
    setFruitsCreatingTracker: (state, action) => {
      state.tracker.fruits = action.payload;
    },
    setWeightCreatingTracker: (state, action) => {
      state.tracker.weight = action.payload;
    },
    setWakeUpCreatingTracker: (state, action) => {
      state.tracker.wake_up_time = action.payload;
    },
    setChangeTrack: (state, action: PayloadAction<boolean>) => {
      state.isChangeTrack = action.payload;
    },
    setDateSleep: (state) => {
      const titleWeek: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
      if(state.tracker.id){
        let weekNow = new Date().getDay();
        let hour =
          state.tracker.wake_up_time.split(":")[0].length === 2
            ? state.tracker.wake_up_time.split(":")[0]
            : "0" + state.tracker.wake_up_time.split(":")[0];
        let minutes =
          state.tracker.wake_up_time.split(":")[1].length === 2
            ? state.tracker.wake_up_time.split(":")[1]
            : "0" + state.tracker.wake_up_time.split(":")[1];
        const morning = hour + ":" + minutes;
        const evening =
          (+hour - 8 < 0 ? 24 + (+hour - 8) : +hour - 8) + ":" + minutes;
        state.datesSleep = state.datesSleep.map((item) => {
          if (weekNow != 0) {
            if (weekNow <= item.id) {
              return {
                ...item,
                date: new Date(
                  new Date().setDate(new Date().getDate() + (item.id - weekNow))
                ),
              };
            } else {
              return {
                ...item,
                date: new Date(
                  new Date().setDate(new Date().getDate() - (weekNow - item.id))
                ),
              };
            }
          } else {
            return {
              ...item,
              date: new Date(
                new Date().setDate(new Date().getDate() - (7 - item.id))
              ),
            };
          }
        });
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 2; j++) {
            if (j === 0) {
              TrackerService.installPushTracker(
                1, morning, state.datesSleep[i].date.setHours(+hour, +minutes, 0, 0) / 1000, titleWeek[i]
              );
              console.log(1, morning, state.datesSleep[i].date.setHours(+hour, +minutes, 0, 0) / 1000, titleWeek[i]);
              
            } else {
              TrackerService.installPushTracker(
                1, evening,
                (state.datesSleep[i].date.setHours(+hour - 8 < 0 ? 24 + (+hour - 8) : +hour - 8,+minutes, 0,0) / 1000 + 86400),titleWeek[i]
              );
              console.log(  1, evening,
                (state.datesSleep[i].date.setHours(+hour - 8 < 0 ? 24 + (+hour - 8) : +hour - 8,+minutes, 0,0) / 1000 + 86400),titleWeek[i]);
              
            }
          }
        }
        console.log(state.datesSleep);
        
      }

    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTracker.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getTracker.fulfilled,
      (state, action: PayloadAction<IGetTracker>) => {
        state.tracker = action.payload;
        state.countWater = +((action.payload.weight * 35) / 1000).toFixed(1);
        state.isLoading = false;
      }
    );
    builder.addCase(getTracks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getTracks.fulfilled,
      (state, action:PayloadAction<ITrack[]>) => {
        state.tracks.fruitTrack = action.payload.filter(item=>item.type === 3);
        state.tracks.waterTrack = action.payload.filter(item=>item.type === 2);
        state.tracks.sleepTrack = action.payload.filter(item=>item.type === 1);
        state.isLoading = false;
      }
    );
  },
});

export const {
  setFruitsCreatingTracker,
  setWakeUpCreatingTracker,
  setWeightCreatingTracker,
  setChangeTrack,
  setDateSleep,
} = trackerSlice.actions;

export const creatingTrackerSelector = (state: RootState) =>
  state.tracker.creatingTracker;
export const trackerSelector = (state: RootState) => state.tracker.tracker;
export const countWaterSelector = (state: RootState) =>
  state.tracker.countWater;
export const isLoadingSelector = (state: RootState) => state.tracker.isLoading;
export const isChangeTrackSelector = (state: RootState) =>
  state.tracker.isChangeTrack;
export const datesSleepSelector = (state: RootState) =>
  state.tracker.datesSleep;
  export const tracksSelector = (state: RootState) =>
  state.tracker.tracks;

export default trackerSlice.reducer;

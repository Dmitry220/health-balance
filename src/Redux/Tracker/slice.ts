import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  tracks: {
    waterTrack: ITrack[];
    sleepTrack: ITrack[];
    fruitTrack: ITrack[];
  };
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
    },
  ],
  tracks: {
    fruitTrack: [],
    sleepTrack: [],
    waterTrack: [],
  },
};

export const getTracker = createAsyncThunk("getTracker", async () => {
  const response = await TrackerService.getTracker();
  return response.data.data;
});

export const getTracks = createAsyncThunk("getTracks", async (date: string) => {
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
  },
  extraReducers: (builder) => {
    builder.addCase(getTracker.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getTracker.fulfilled,
      (state, action: PayloadAction<IGetTracker>) => {
        if (action.payload) {
          state.tracker = action.payload;
          state.countWater = +((action.payload.weight * 35) / 1000).toFixed(1);
          state.isLoading = false;
        }else{
          state.tracker.id = 0;
        }
      }
    );
    builder.addCase(getTracks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getTracks.fulfilled,
      (state, action: PayloadAction<ITrack[]>) => {
        state.tracks.fruitTrack = action.payload.filter(
          (item) => item.type === 3
        );
        state.tracks.waterTrack = action.payload.filter(
          (item) => item.type === 2
        );
        state.tracks.sleepTrack = action.payload.filter(
          (item) => item.type === 1 || item.type === 4
        );
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
export const tracksSelector = (state: RootState) => state.tracker.tracks;

export default trackerSlice.reducer;

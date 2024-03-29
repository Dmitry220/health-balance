import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


export interface ISettingsSlice {
  googleFit: number;
}

const initialState: ISettingsSlice = {
  googleFit: 1,
};

export const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {
    setGoogleFit: (state, action) => {
      state.googleFit = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setGoogleFit } = settingsSlice.actions;

export const isGoogleFitSelector = (state: RootState) => state.settings.googleFit;

export default settingsSlice.reducer;

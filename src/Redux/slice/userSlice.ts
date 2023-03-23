import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser } from "../../models/IUsers";
import UserService from "../../services/UserServices";

export interface IUserInfo {
  dataUser: IUser;
}

const initialState: IUserInfo = {
  dataUser: {
    id: 0,
    name: "",
    surname: "",
    gender: 1,
    birthday: 0,
    phone: "",
    email: "",
    avatar: "",
    challenges: 0,
    completed_challenges: 0,
    role: 0,
    steps: 0,
  },
};

export const setUserInfo = createAsyncThunk("userInfo", async (id: number) => {
  const response = await UserService.getUserDataOnId(id);
  return response.data.data;
});

export const userSlice = createSlice({
  name: "userInfo",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      setUserInfo.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.dataUser = action.payload;
      }
    );
  },
});

export const {} = userSlice.actions;

export const infoUserSelector = (state: RootState) => state.user.dataUser;

export default userSlice.reducer;

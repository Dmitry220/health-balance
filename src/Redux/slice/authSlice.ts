import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "../store";
import AuthService from "../../services/AuthService";
import { ILogin, IRegistration, IVisitPages } from "../../models/IAuth";
import PlatformService from "../../services/PlatformService";
import { IListPlatform } from "../../models/IPlatforms";
import { showToast } from "../../utils/common-functions";
import { AxiosError } from "axios";


export interface IAuth {
  disabledButton?: boolean;
  listPlatforms?: IListPlatform[] | [];
  isAuth: boolean;
  error: boolean;
  isLoading: boolean;
  dataRegistration: IRegistration;
  visitPages: IVisitPages;
}

const initialState: IAuth = {
  disabledButton: true,
  listPlatforms: [],
  isAuth: false,
  error: false,
  isLoading: false,
  dataRegistration: {
    email: "",
    phone: "",
    password: "",
    name: "",
    surname: "",
    birthday: new Date('07.15.'+(new Date().getFullYear()-23).toString()).setHours(0,0,0,0)/1000,
    gender: 1,
    platform: 0,
    avatar: "",
    device_token: "",
    timezone:-new Date().getTimezoneOffset()/60 
  },
  visitPages: {
    activity: 0,
    challenge: 0,
    tracker: 0,
  },
};

export const getPlatforms = createAsyncThunk("platforms", async () => {
  const response = await PlatformService.getPlatfotms();
  return await response.data.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setEmail: (state, action) => {
      state.dataRegistration!.email = action.payload;
    },
    setPassword: (state, action) => {
      state.dataRegistration!.password = action.payload;
    },
    setTelephone: (state, action) => {
      state.dataRegistration!.phone = action.payload;
    },
    setNameUser: (state, action) => {
      state.dataRegistration!.name = action.payload;
    },
    setSurname: (state, action) => {
      state.dataRegistration!.surname = action.payload;
    },
    setBirthday: (state, action) => {
      state.dataRegistration!.birthday = action.payload;
    },
    setGender: (state, action) => {
      state.dataRegistration!.gender = action.payload;
    },
    setPlatform: (state, action) => {
      state.dataRegistration!.platform = action.payload;
    },
    setAvatarRegistartion: (state, action) => {
      state.dataRegistration!.avatar = action.payload;
    },
    setDisabledButton: (state, action) => {
      state.disabledButton = action.payload;
    },
    checkAuth: (state) => {
      if (localStorage.getItem("token")) {
        state.isAuth = true;
      }
    },
    setVisitedChallengePage: (state, action) => {
      state.visitPages.challenge = action.payload;
    },
    setVisitedTrackerPage: (state, action) => {
      state.visitPages.tracker = action.payload;
    },
    setVisitedActivityPage: (state, action) => {
      state.visitPages.activity = action.payload;
    },
    resetFieldRegistration: (state) => {
      state.dataRegistration = {
        email: "",
        phone: "",
        password: "",
        name: "",
        surname: "",
        birthday: 1029528000,
        gender: 1,
        platform: 0,
        avatar: "",
        device_token: "",
        timezone:-new Date().getTimezoneOffset()/60 
      }
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      state.isAuth = false;
      state.visitPages.activity = 0;
      state.visitPages.tracker = 0;
      state.visitPages.challenge = 0;
    },
    setAuth:(state)=>{
      state.isAuth = true
    },
    clearResults() {
      // Note that this should be left intentionally empty.
			// Clearing redux state and localForage happens in rootReducer.ts.
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getPlatforms.fulfilled,
      (state, action: PayloadAction<IListPlatform[]>) => {
        state.listPlatforms = action.payload;
        state.error = false;
      }
    );    
  },
});

export const {
  setEmail,
  setDisabledButton,
  setGender,
  setNameUser,
  setPassword,
  setPlatform,
  setSurname,
  setTelephone,
  setAvatarRegistartion,
  setBirthday,
  checkAuth,
  logout,
  setVisitedActivityPage,
  setVisitedChallengePage,
  setVisitedTrackerPage,
  resetFieldRegistration,
  clearResults,
  setAuth
} = authSlice.actions;

export const emailSelector = (state: RootState) =>
  state.auth.dataRegistration!.email;
export const disableButtonSelector = (state: RootState) =>
  state.auth.disabledButton;
export const passwordSelector = (state: RootState) =>
  state.auth.dataRegistration!.password;
export const telephoneSelector = (state: RootState) =>
  state.auth.dataRegistration!.phone;
export const nameUserSelector = (state: RootState) =>
  state.auth.dataRegistration!.name;
export const surNameSelector = (state: RootState) =>
  state.auth.dataRegistration!.surname;
export const birthdaySelector = (state: RootState) =>
  state.auth.dataRegistration!.birthday;
export const genderSelector = (state: RootState) =>
  state.auth.dataRegistration!.gender;
export const platformSelector = (state: RootState) =>
  state.auth.dataRegistration!.platform;
export const listPlatformSelector = (state: RootState) =>
  state.auth.listPlatforms;
export const avatarSelector = (state: RootState) =>
  state.auth.dataRegistration!.avatar;
export const isAuthSelector = (state: RootState) => state.auth.isAuth;
export const isLoadingSelector = (state: RootState) => state.auth.isLoading;
export const errorSelector = (state: RootState) => state.auth.error;
export const visitPagesSelector = (state: RootState) => state.auth.visitPages;

export default authSlice.reducer;

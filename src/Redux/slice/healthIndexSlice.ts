import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import HealthIndexService from "../../services/HealthIndexService";
import {
  IDynamics,
  IGetProgressAndIDPolls,
  IQuestionnaire,
} from "../../models/IHealthIndex";

interface IHealthIndex {
  questionnaire: IQuestionnaire[];
  answers: any;
  progress: number;
  idPoll: number;
  isInterruptPoll: boolean;
  dynamics: IDynamics[],
  isLoading: boolean
}

const initialState: IHealthIndex = {
  progress: 0,
  questionnaire: [],
  answers: [],
  idPoll: 0,
  isInterruptPoll: false,
  dynamics: [],
  isLoading: false
};

export const getQuestionnaire = createAsyncThunk(
  "getQuestionnaire",
  async () => {
    const response = await HealthIndexService.getQuestionnaire();
    return response.data.data;
  }
);

export const getProgressAndIdPolls = createAsyncThunk(
  "getProgressAndIdPolls",
  async () => {
    const response = await HealthIndexService.getProgressAndIdPolls();
    return response.data.data;
  }
);

export const interruptPoll = createAsyncThunk(
  "interruptPoll",
  async (id: number) => {
    const response = await HealthIndexService.interruptPoll(id);
    if(response.data.data.success === true){
      console.log(response);
    }
    
  }
);

export const saveCurrentResult = createAsyncThunk(
  "saveCurrentResult",
  async (id: number, { getState }) => {
    const state: any = getState();
    const answers = Object.assign({}, ...state.healthIndex.answers);
    const formData = new FormData();
    formData.append("answers", JSON.stringify(answers));
    const response = await HealthIndexService.saveCurrentResult(id, formData);
    console.log(response.data);
    return response.data.data;
  }
);

export const generateResultsPoll = createAsyncThunk(
  "generateResultsPoll",
  async (id: number) => {
    const response = await HealthIndexService.generateResultsPoll(id);
    console.log(response);
  }
);

export const getDynamics = createAsyncThunk(
  "getDynamics",
  async () => {
    const response = await HealthIndexService.getDynamics();
    return response.data.data
  }
);

export const healthIndexSlice = createSlice({
  name: "healthIndex",
  initialState,
  reducers: {
    addIndexPageAnswer: (state, action) => {
      state.answers = [...state.answers, action.payload];
    },
    resetAnswers: (state) => {
      state.answers = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getQuestionnaire.fulfilled,
      (state, action: PayloadAction<IQuestionnaire[]>) => {
        state.questionnaire = action.payload;
      }
    );
    builder.addCase(
      getProgressAndIdPolls.fulfilled,
      (state, action: PayloadAction<IGetProgressAndIDPolls>) => {
        state.progress = action.payload.progress - 1;
        state.idPoll = action.payload.id;
      }
    );
    builder.addCase(
      saveCurrentResult.fulfilled,
      (state, action: PayloadAction<{ progress: number }>) => {
        state.progress = action.payload.progress - 1;
      }
    );
    builder.addCase(
      getDynamics.fulfilled,
      (state, action: PayloadAction<IDynamics[]>) => {
        state.dynamics = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(
      getDynamics.pending,
      (state) => {
        state.isLoading = true;
      }
    );
  },
});

export const { addIndexPageAnswer, resetAnswers } = healthIndexSlice.actions;

export const questionnaireSelector = (state: RootState) =>
  state.healthIndex.questionnaire;
export const answersQuestionnaireSelector = (state: RootState) =>
  state.healthIndex.answers;
export const progressPollSelector = (state: RootState) =>
  state.healthIndex.progress;
export const idPolleSelector = (state: RootState) => state.healthIndex.idPoll;
export const dynamicsSelector = (state: RootState) => state.healthIndex.dynamics;
export const isLoadingSelector = (state: RootState) => state.healthIndex.isLoading;
export default healthIndexSlice.reducer;

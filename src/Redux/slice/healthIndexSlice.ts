import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import HealthIndexService from "../../services/HealthIndexService";
import {
  IGetProgressAndIDPolls,
  IQuestionnaire,
} from "../../models/IHealthIndex";

interface IHealthIndex {
  questionnaire: any;
  answers: any;
  last_step: number;
  progress: number;
  idPoll: number;
  isInterruptPoll: boolean;
}

const initialState: IHealthIndex = {
  progress: 0,
  questionnaire: { index: { id: 0, name: "", questions: [] } },
  answers: [],
  last_step: 0,
  idPoll: 0,
  isInterruptPoll: false,
};

export const getQuestionnaire = createAsyncThunk(
  "getQuestionnaire",
  async () => {
    const response = await HealthIndexService.getQuestionnaire();
    return response.data;
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
    console.log(response);
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
      (state, action: PayloadAction<IQuestionnaire>) => {
        state.questionnaire = action.payload;
      }
    );
    builder.addCase(
      getProgressAndIdPolls.fulfilled,
      (state, action: PayloadAction<IGetProgressAndIDPolls>) => {
        state.progress = action.payload.progress;
        state.idPoll = action.payload.id;
      }
    );
    builder.addCase(
      saveCurrentResult.fulfilled,
      (state, action: PayloadAction<{ progress: number }>) => {
        state.progress = action.payload.progress;
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

export default healthIndexSlice.reducer;

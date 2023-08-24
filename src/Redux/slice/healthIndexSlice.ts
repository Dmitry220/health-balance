import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import HealthIndexService from "../../services/HealthIndexService";
import {
  IDynamics,
  IGetProgressAndIDPolls,
  IQuestionnaire,
  ISaveCurrentResult,
} from "../../models/IHealthIndex";

interface IHealthIndex {
  questionnaire: IQuestionnaire[];
  answers: any;
  progress: number;
  idPoll: number;
  isInterruptPoll: boolean;
  dynamics: IDynamics[];
  isLoading: boolean;
}

const initialState: IHealthIndex = {
  progress: 0,
  questionnaire: [],
  answers: [],
  idPoll: 0,
  isInterruptPoll: false,
  dynamics: [],
  isLoading: false,
};

export const getQuestionnaire = createAsyncThunk(
  "getQuestionnaire",
  async (arg, { getState }) => {
    const state: any = getState();
    const response = await HealthIndexService.getQuestionnaire();
    return {
      questionnaireKey: response.data.data,
      genderKey: state.profile.dataUser.gender,
    };
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
    await HealthIndexService.interruptPoll(id);
  }
);

export const saveCurrentResult = createAsyncThunk(
  "saveCurrentResult",
  async (id: number, { getState }) => {
    const state: any = getState();
    const answers = Object.assign({}, ...state.healthIndex.answers);
    const data: ISaveCurrentResult = {
      answers: JSON.stringify(answers),
    };
    const response = await HealthIndexService.saveCurrentResult(id, data);
    return response.data.data;
  }
);

export const generateResultsPoll = createAsyncThunk(
  "generateResultsPoll",
  async (id: number) => {
    const response = await HealthIndexService.generateResultsPoll(id);
    return response.data;
  }
);

export const getDynamics = createAsyncThunk("getDynamics", async () => {
  const response = await HealthIndexService.getDynamics();
  return response.data.data;
});

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
    resetQuestionnaire: (state) => {
      state.questionnaire = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getQuestionnaire.fulfilled,
      (
        state,
        action: PayloadAction<{
          questionnaireKey: IQuestionnaire[];
          genderKey: number;
        }>
      ) => {
        state.questionnaire = action.payload.questionnaireKey?.map((item) => {
          item.questions = item?.questions?.filter((q) => {
            if (action.payload.genderKey === 1) {
              return q?.tag != "waist_w" && q?.tag != 'mammography';
            }
            
            if (action.payload.genderKey === 2) {
              
              return q?.tag != "waist_m" && q?.tag != 'prostate_cancer_test';
            }
          });
          return item;
        });
      }
    );
    builder.addCase(
      getProgressAndIdPolls.fulfilled,
      (state, action: PayloadAction<IGetProgressAndIDPolls>) => {
        state.progress = action.payload.progress - 1;
        state.idPoll = action.payload.id;
        state.isLoading = false;
      }
    );
    builder.addCase(getProgressAndIdPolls.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      saveCurrentResult.fulfilled,
      (state, action: PayloadAction<{ progress: number }>) => {
        state.progress = action.payload.progress - 1;
        state.isLoading = false;
      }
    );
    builder.addCase(saveCurrentResult.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getDynamics.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getDynamics.fulfilled,
      (state, action: PayloadAction<IDynamics[]>) => {
        state.dynamics = action.payload.slice(Math.max(action.payload.length - 12, 0));
        state.isLoading = false;
      }
    );

    builder.addCase(generateResultsPoll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(generateResultsPoll.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const { addIndexPageAnswer, resetAnswers, resetQuestionnaire } =
  healthIndexSlice.actions;

export const questionnaireSelector = (state: RootState) =>
  state.healthIndex.questionnaire;
export const answersQuestionnaireSelector = (state: RootState) =>
  state.healthIndex.answers;
export const progressPollSelector = (state: RootState) =>
  state.healthIndex.progress;
export const idPolleSelector = (state: RootState) => state.healthIndex.idPoll;
export const dynamicsSelector = (state: RootState) =>
  state.healthIndex.dynamics;
export const isLoadingSelector = (state: RootState) =>
  state.healthIndex.isLoading;
export default healthIndexSlice.reducer;

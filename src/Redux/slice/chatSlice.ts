import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


interface IChatSlice {

}

const initialState: IChatSlice = {


};

// export const getQuestionnaire = createAsyncThunk(
//   "getQuestionnaire",
//   async () => {
//     const response = await HealthIndexService.getQuestionnaire();
//     return response.data.data;
//   }
// );

// export const getProgressAndIdPolls = createAsyncThunk(
//   "getProgressAndIdPolls",
//   async () => {
//     const response = await HealthIndexService.getProgressAndIdPolls();
//     return response.data.data;
//   }
// );

// export const interruptPoll = createAsyncThunk(
//   "interruptPoll",
//   async (id: number) => {
//     const response = await HealthIndexService.interruptPoll(id);
//     if(response.data.data.success === true){
//       console.log(response);
//     }
    
//   }
// );

// export const saveCurrentResult = createAsyncThunk(
//   "saveCurrentResult",
//   async (id: number, { getState }) => {
//     const state: any = getState();
//     const answers = Object.assign({}, ...state.healthIndex.answers);
//     const formData = new FormData();
//     formData.append("answers", JSON.stringify(answers));
//     const response = await HealthIndexService.saveCurrentResult(id, formData);
//     console.log(response.data);
//     return response.data.data;
//   }
// );



export const chatSlice = createSlice({
  name: "healthIndex",
  initialState,
  reducers: {
    // addIndexPageAnswer: (state, action) => {
    //   state.answers = [...state.answers, action.payload];
    // },

  },
  extraReducers: (builder) => {
    // builder.addCase(
    //   getQuestionnaire.fulfilled,
    //   (state, action: PayloadAction<IQuestionnaire[]>) => {
    //     state.questionnaire = action.payload;
    //   }
    // );

  },
});

export const {} = chatSlice.actions;

// export const questionnaireSelector = (state: RootState) =>
//   state.healthIndex.questionnaire;
// export const answersQuestionnaireSelector = (state: RootState) =>
//   state.healthIndex.answers;
// export const progressPollSelector = (state: RootState) =>
//   state.healthIndex.progress;
// export const idPolleSelector = (state: RootState) => state.healthIndex.idPoll;
// export const dynamicsSelector = (state: RootState) => state.healthIndex.dynamics;
// export const isLoadingSelector = (state: RootState) => state.healthIndex.isLoading;

export default chatSlice.reducer;

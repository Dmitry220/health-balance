import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ILesson } from "../../models/ILessons";
import LessonService from "../../services/LessonsService";

export interface ILessonState {
  lesson: ILesson | null;
  lessons: ILesson[] | [];
  isLoading: boolean;
}

const initialState: ILessonState = {
  lesson: null,
  lessons: [],
  isLoading: false,
};

export const getLessonById = createAsyncThunk(
  "getLessonById",
  async (id: number) => {
    const response = await LessonService.getLessonById(id);
    return await response.data.data;
  }
);

export const getLessons = createAsyncThunk("getLessons", async () => {
  const response = await LessonService.getLessons();
  return await response.data.data;
});

export const creatingLecture = createAsyncThunk(
	'creatingLecture',
	async (arg,{getState}) => {      
		  const state:any = getState()			  
			//   const formData = new FormData()
			  // formData.append("platform",state.lesson.creatingChallenge.platform)
			//   formData.append("title",state.lesson.creatingChallenge.title)
			//   formData.append("description",state.lesson.creatingChallenge.description)
			//   formData.append("type",state.lesson.creatingChallenge.type)
			//   formData.append("image",state.lesson.creatingChallenge.image)
			//   formData.append("start_date",''+(state.lesson.creatingChallenge.startDate).getTime()/1000)
			//   formData.append("end_date",''+(state.lesson.creatingChallenge.startDate).getTime()/1000)
			//   formData.append("team_amount",state.lesson.creatingChallenge.team_amount)
			//   formData.append("max_peoples",state.lesson.creatingChallenge.max_peoples)            
		 try{
				// const response = await LessonService.createLesson(formData)      
				// console.log(response);                     
		 }catch(e){
			  console.log(e);            
		 }            
	}
)

export const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    //  setTypePurpose: (state, action) => {
    //    state.purpose.type = action.payload;
    //  },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getLessonById.fulfilled,
      (state, action: PayloadAction<ILesson>) => {
        state.lesson = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getLessonById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getLessons.fulfilled,
      (state, action: PayloadAction<ILesson[]>) => {
        state.lessons = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getLessons.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const {} = lessonsSlice.actions;

export const lessonsSelector = (state: RootState) => state.lessons.lessons;
export const lessonSelector = (state: RootState) => state.lessons.lesson;

export const isLoadingSelector = (state: RootState) => state.lessons.isLoading;

export default lessonsSlice.reducer;

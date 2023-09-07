import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ILesson } from '../../models/ILessons'
import LessonService from '../../services/LessonsService'

export interface ILessonState {
  lesson: ILesson | null
  lessons: ILesson[] | []
  isLoading: boolean
  isLoadingSuccess: boolean
  success: boolean
}

const initialState: ILessonState = {
  lesson: null,
  lessons: [],
  isLoading: false,
  isLoadingSuccess: false,
  success: false
}

export const getLessonById = createAsyncThunk(
  'getLessonById',
  async (id: number) => {
    const response = await LessonService.getLessonById(id)
    return await response.data.data
  }
)

export const getLessons = createAsyncThunk('getLessons', async (id: number) => {
  const response = await LessonService.getLessons(id)
  return await response.data.data
})

export const checkTask = createAsyncThunk('checkTask', async (id: number) => {
  const response = await LessonService.checkTask(id)
  return await response.data.exist
})

export const lessonsSlice = createSlice({
  name: 'lessons',
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
        state.lesson = action.payload
        state.isLoading = false
      }
    )
    builder.addCase(getLessonById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getLessons.fulfilled,
      (state, action: PayloadAction<ILesson[]>) => {
        state.lessons = action.payload
        state.isLoading = false
      }
    )
    builder.addCase(getLessons.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(checkTask.pending, (state) => {
      state.isLoadingSuccess = true
    })
    builder.addCase(
      checkTask.fulfilled,
      (state, action: PayloadAction<boolean>) => {
        state.isLoadingSuccess = false
        state.success = action.payload
      }
    )
  }
})

export const {} = lessonsSlice.actions

export const lessonsSelector = (state: RootState) => state.lessons.lessons
export const lessonSelector = (state: RootState) => state.lessons.lesson

export const isLoadingSelector = (state: RootState) => state.lessons.isLoading
export const isLoadingSuccessSelector = (state: RootState) =>
  state.lessons.isLoadingSuccess
export const successSelector = (state: RootState) => state.lessons.success

export default lessonsSlice.reducer

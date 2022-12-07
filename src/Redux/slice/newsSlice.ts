import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ICreatingNews, IComment, INews } from '../../models/INews'
import NewsService from '../../services/NewsService'

export interface IChallenge {
  creatingNews: ICreatingNews
  news: INews[] | []
  psychologyNews: INews[] | []
  motivationNews: INews[] | []
  instructionNews: INews[] | []
  newsById: INews | null
  isLoading: boolean,
  imageNews?: any,
  comments: IComment[]
}

const initialState: IChallenge = {
  creatingNews: {
    annotation: '',
    content: '',
    image: '',
    team: 0,
    title: '',
    category: 0,
    push: 0
  },
  isLoading: false,
  newsById: null,
  instructionNews: [],
  motivationNews: [],
  psychologyNews: [],
  news: [],
  comments: []
}

export const creatingNews = createAsyncThunk<unknown>(
  'creatingNews',
  async (arg, { getState }) => {
    const state: any = getState()
    const formData = new FormData()
    formData.append('title', state.news.creatingNews.title)
    formData.append('annotation', state.news.creatingNews.annotation)
    formData.append('content', state.news.creatingNews.content)
    formData.append('image', state.news.creatingNews.image)
    state.news.creatingNews.team != 0 &&
      formData.append('team', state.news.creatingNews.team)
    formData.append('category', state.news.creatingNews.category)
    formData.append('push', state.news.creatingNews.push)
    try {
      const response = await NewsService.creatingNews(formData)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }
)

export const getNews = createAsyncThunk('getNews', async () => {
  const response = await NewsService.getNews()
  return response.data.data
})

export const getNewsById = createAsyncThunk(
  'getNewsById',
  async (id: number) => {
    const response = await NewsService.getNewsById(id)
    return response.data.data
  }
)

export const getComments = createAsyncThunk(
  'getComments',
  async (id: number) => {
    const response = await NewsService.listComments()
    return response.data.data
  }
)

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setTitleNews: (state, action) => {
      state.creatingNews.title = action.payload
    },
    setContentNews: (state, action) => {
      state.creatingNews.content = action.payload
    },
    setAnnotationNews: (state, action) => {
      state.creatingNews.annotation = action.payload
    },
    setImageNews: (state, action) => {
      state.creatingNews.image = action.payload
    },
    setTempImageNews: (state, action) => {
      state.imageNews = action.payload
    },
    setTeamNews: (state, action) => {
      state.creatingNews.team = action.payload
    },
    setRubricNews: (state, action) => {
      state.creatingNews.category = action.payload
    },
    setPushNews: (state, action) => {
      state.creatingNews.push = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      getNews.fulfilled,
      (state, action: PayloadAction<INews[]>) => {
        state.news = action.payload.filter((item) => item.category === 4)
        state.motivationNews = action.payload.filter(
          (item) => item.category === 3
        )
        state.instructionNews = action.payload.filter(
          (item) => item.category === 2
        )
        state.psychologyNews = action.payload.filter(
          (item) => item.category === 1
        )
        state.isLoading = false
      }
    )
    builder.addCase(getNews.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getNewsById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getNewsById.fulfilled,
      (state, action: PayloadAction<INews>) => {
        state.newsById = action.payload
        state.isLoading = false
      }
    )
    builder.addCase(getComments.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getComments.fulfilled,
      (state, action: PayloadAction<IComment[]>) => {
        state.comments = action.payload
        state.isLoading = false
      }
    )
  }
})

export const {
  setAnnotationNews,
  setContentNews,
  setImageNews,
  setTeamNews,
  setTitleNews,
  setRubricNews,
  setPushNews,
  setTempImageNews
} = newsSlice.actions

export const isLoadingSelector = (state: RootState) => state.news.isLoading
export const newsSelector = (state: RootState) => state.news.news
export const psyholgySelector = (state: RootState) => state.news.psychologyNews
export const motivationSelector = (state: RootState) =>
  state.news.motivationNews
export const instructionNewsSelector = (state: RootState) =>
  state.news.instructionNews
export const newsByIdSelector = (state: RootState) => state.news.newsById
export const creatingNewsSelector = (state: RootState) =>
  state.news.creatingNews
  export const tempImageNewsSelector = (state: RootState) =>
  state.news.imageNews
  export const commentsSelector = (state: RootState) =>
  state.news.comments

export default newsSlice.reducer

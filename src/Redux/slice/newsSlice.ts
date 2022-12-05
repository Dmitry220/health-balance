import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICreatingNews, INews } from "../../models/INews";
import NewsService from "../../services/NewsService";

export interface IChallenge {
  creatingNews: ICreatingNews;
  news: INews[] | null;
  newsById: INews | null;
  isLoading: boolean;
}

const initialState: IChallenge = {
  creatingNews: { annotation: "", content: "", image: "", team: 0, title: "" },
  isLoading: false,
  newsById: null,
  news: null,
};

export const creatingNews = createAsyncThunk<unknown>(
  "creatingNews",
  async (arg, { getState }) => {
    const state: any = getState();
    const formData = new FormData();
    formData.append("title", state.news.creatingNews.title);
    formData.append("annotation", state.news.creatingNews.annotation);
    formData.append("content", state.news.creatingNews.content);
    formData.append("image", state.news.creatingNews.image);
    formData.append("team", state.news.creatingNews.team);
    try {
      const response = await NewsService.creatingNews(formData);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
);

export const getNews = createAsyncThunk("getNews", async () => {
  const response = await NewsService.getNews();
  return response.data.data;
});

export const getNewsById = createAsyncThunk(
  "getNewsById",
  async (id: number) => {
    const response = await NewsService.getNewsById(id);
    return response.data.data;
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setTitleNews: (state, action) => {		
      state.creatingNews.title = action.payload;
    },
    setContentNews: (state, action) => {
      state.creatingNews.content = action.payload;
    },
    setAnnotationNews: (state, action) => {
      state.creatingNews.annotation = action.payload;
    },
    setImageNews: (state, action) => {
      state.creatingNews.image = action.payload;
    },
    setTeamNews: (state, action) => {
      state.creatingNews.team = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getNews.fulfilled,
      (state, action: PayloadAction<INews[]>) => {
        state.news = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getNews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNewsById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getNewsById.fulfilled,
      (state, action: PayloadAction<INews>) => {
        state.newsById = action.payload;
        state.isLoading = false;
      }
    );
  },
});

export const {
  setAnnotationNews,
  setContentNews,
  setImageNews,
  setTeamNews,
  setTitleNews,
} = newsSlice.actions;

export const isLoadingSelector = (state: RootState) => state.news.isLoading;
export const newsSelector = (state: RootState) => state.news.news;
export const newsByIdelector = (state: RootState) => state.news.newsById;
export const creatingNewsSelector = (state: RootState) =>
  state.news.creatingNews;

export default newsSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  IBasket,
  IOrders,
  IShopCategory,
  IShopProduct,
} from "../../models/IShop";
import ShopService from "../../services/ShopService";

export interface IShop {
  categories: IShopCategory[] | [];
  products: IShopProduct[] | [];
  orders: IOrders[] | [];
  isLoading: boolean;
  basket: IBasket[] | [];
  productById: IShopProduct | null;
}

const initialState: IShop = {
  categories: [],
  products: [],
  orders: [],
  isLoading: false,
  basket: [],
  productById: null,
};

export const getShopCategories = createAsyncThunk(
  "shopCategories",
  async () => {
    const response = await ShopService.getCategory();
    return response.data.data;
  }
);

export const getProductsCategory = createAsyncThunk(
  "productsCategoty",
  async (id: number) => {
    const response = await ShopService.getProducts(id);
    return response.data.data;
  }
);

export const getProductById = createAsyncThunk(
  "getProductById",
  async (id: number) => {
    const response = await ShopService.getProductById(id);
    return response.data.data;
  }
);

export const getOrders = createAsyncThunk("getOrders", async () => {
  const response = await ShopService.getOrders();
  return response.data.data;
});

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setBasket(state, action: PayloadAction<IBasket>) {
      state.basket = [...state.basket, action.payload];
    },
    deleteBasket(state, action: PayloadAction<IBasket>) {
      state.basket = state.basket.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearBasket(state) {
      state.basket = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getShopCategories.fulfilled,
      (state, action: PayloadAction<IShopCategory[]>) => {
        state.categories = action.payload;
        state.isLoading = false;
      }
    );

    builder.addCase(getShopCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getProductsCategory.fulfilled,
      (state, action: PayloadAction<IShopProduct[]>) => {
        state.products = action.payload;
        state.isLoading = false;
      }
    );

    builder.addCase(getProductsCategory.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      getOrders.fulfilled,
      (state, action: PayloadAction<IOrders[]>) => {
        state.orders = action.payload;
        state.isLoading = false;
      }
    );

    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      getProductById.fulfilled,
      (state, action: PayloadAction<IShopProduct>) => {
        state.productById = action.payload;
        state.isLoading = false;
      }
    );

    builder.addCase(getProductById.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { setBasket, deleteBasket,clearBasket } = shopSlice.actions;

export const shopCategoriesSelector = (state: RootState) =>
  state.shop.categories;
export const shopProductsSelector = (state: RootState) => state.shop.products;
export const ordersSelector = (state: RootState) => state.shop.orders;
export const basketSelector = (state: RootState) => state.shop.basket;
export const isLoadingSelector = (state: RootState) => state.shop.isLoading;
export const productByIdSelector = (state: RootState) => state.shop.productById;
export default shopSlice.reducer;

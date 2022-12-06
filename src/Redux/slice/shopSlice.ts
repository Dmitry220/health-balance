import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IShopCategory, IShopProduct } from '../../models/IShop'
import ShopService from '../../services/ShopService'

export interface IShop {
  categories: IShopCategory[] | []
  products: IShopProduct[] | []
  isLoading: boolean
}

const initialState: IShop = {
  categories: [],
  products: [],
  isLoading: false
}

export const getShopCategories = createAsyncThunk(
  'shopCategories',
  async () => {
    const response = await ShopService.getCategory()
    return response.data.data
  }
)

export const getProductsCategory = createAsyncThunk(
  'productsCategoty',
  async (id: number) => {
    const response = await ShopService.getProducts(id)
    return response.data.data
  }
)

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getShopCategories.fulfilled,
      (state, action: PayloadAction<IShopCategory[]>) => {
        state.categories = action.payload
        state.isLoading = false
      }
    )

    builder.addCase(getShopCategories.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getProductsCategory.fulfilled,
      (state, action: PayloadAction<IShopProduct[]>) => {
        state.products = action.payload
        state.isLoading = false
      }
    )

    builder.addCase(getProductsCategory.pending, (state) => {
      state.isLoading = true
    })
  }
})

export const {} = shopSlice.actions

export const shopCategoriesSelector = (state: RootState) =>
  state.shop.categories
export const shopProductsSelector = (state: RootState) => state.shop.products

export const isLoadingSelector = (state: RootState) => state.shop.isLoading

export default shopSlice.reducer

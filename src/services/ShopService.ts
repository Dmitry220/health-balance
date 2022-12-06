import { AxiosResponse } from 'axios'
import { $api } from '../http'
import { IShopCategory, IShopProduct } from '../models/IShop'

export default class ShopService {
  static async getCategory(): Promise<
    AxiosResponse<{ data: IShopCategory[] }>
  > {
    return $api.get(
      `/v2/shop-categories/?token=${localStorage.getItem('token')}`
    )
  }

  static async getProducts(
    id: number
  ): Promise<AxiosResponse<{ data: IShopProduct[] }>> {
    return $api.get(
      `/v2/products/${id}/?token=${localStorage.getItem('token')}`
    )
  }
}

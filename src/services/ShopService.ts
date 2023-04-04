import { AxiosResponse } from "axios";
import { $api } from "../http";
import { IOrders, IShopCategory, IShopProduct } from "../models/IShop";

export default class ShopService {
  static async getCategory(): Promise<
    AxiosResponse<{ data: IShopCategory[] }>
  > {
    return $api.get(
      `shop-categories/?token=${localStorage.getItem("token")}`
    );
  }

  static async getProducts(
    id: number
  ): Promise<AxiosResponse<{ data: IShopProduct[] }>> {
    return $api.get(
      `products/?token=${localStorage.getItem("token")}&category=${id}`
    );
  }

  static async getProductById(
    id: number
  ): Promise<AxiosResponse<{ data: IShopProduct }>> {
    return $api.get(
      `products/${id}?token=${localStorage.getItem("token")}&category=${id}`
    );
  }

  static async getOrders(): Promise<AxiosResponse<{ data: IOrders[] }>> {
    return $api.get(
      `orders/?token=${localStorage.getItem("token")}`
    );
  }

  static async sendOrder(products:number[]): Promise<AxiosResponse<{ success: 1|0 }>> {
    return $api.post(
      `orders/?token=${localStorage.getItem("token")}`,
      {products:JSON.stringify(products)},
     { headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      }},
    );
  }
}

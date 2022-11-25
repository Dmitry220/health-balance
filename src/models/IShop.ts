export interface IShopCategory {
  id: number;
  name: string;
}

export interface IShopProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  position: number;
  status: boolean;
}

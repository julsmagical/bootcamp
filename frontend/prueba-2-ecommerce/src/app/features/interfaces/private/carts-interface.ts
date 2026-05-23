export interface ICartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
}

export interface ICart {
  id: number;
  totalProducts: number;
  totalQuantity: number;
  total: number;
  discountedTotal: number;
  userId: number;
  products: ICartProduct[];
}

export interface ICartsResponse {
  carts: ICart[];
  total: number;
  skip: number;
  limit: number;
}
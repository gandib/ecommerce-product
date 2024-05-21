import { Model } from 'mongoose';
import { TProduct } from '../product/product.interface';

export type TOrder = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};

// creating custom static method
export interface OrderModel extends Model<TOrder> {
  updateQuantity(id: string): Promise<TProduct>;
}

import { Schema, model } from 'mongoose';
import { OrderModel, TOrder } from './order.interface';
import { Product } from '../product/product.model';

const orderSchema = new Schema<TOrder, OrderModel>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// static methods for updating inventory quantity field
orderSchema.statics.updateQuantity = async (id: string) => {
  const getProduct = await Product.findOne({ _id: id });
  return getProduct;
};

export const Order = model<TOrder, OrderModel>('Order', orderSchema);

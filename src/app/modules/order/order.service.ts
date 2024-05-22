import { TProduct } from '../product/product.interface';
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const product = await Order.updateQuantity(orderData.productId);
  let result;
  if (!product) {
    throw new Error(
      'ProductId is not valid or not found in product collection!',
    );
  }
  const newQuantity = product?.inventory?.quantity - orderData.quantity;
  if (
    orderData.quantity <= product?.inventory?.quantity &&
    product?.inventory?.inStock !== false
  ) {
    // update quantity in Product's inventory
    await Product.findOneAndUpdate(
      { _id: orderData.productId },
      { $set: { 'inventory.quantity': newQuantity } },
      { new: true },
    );

    // update inStock field of Product's inventory
    if (product?.inventory?.quantity === orderData.quantity) {
      await Product.updateOne(
        { _id: orderData.productId },
        { $set: { 'inventory.inStock': false } },
      );
    }
    result = await Order.create(orderData);
  } else {
    throw new Error('Insufficient quantity available in inventory!');
  }
  return result;
};

const getAllOrder = async (email: any = null) => {
  let result;
  if (email) {
    result = await Order.find({ email: email });
    // console.log(result);
    return result;
  } else {
    return (result = await Order.find());
  }
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrder,
};

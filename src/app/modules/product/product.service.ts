import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getAllProductByIdFromDB = async (productId: string) => {
  const result = await Product.findOne({ _id: productId });
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getAllProductByIdFromDB,
};

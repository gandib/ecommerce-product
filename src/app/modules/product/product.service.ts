import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async (searchTerm: any = null) => {
  let result;
  if (searchTerm) {
    return (result = await Product.find({
      $or: [
        { name: new RegExp(searchTerm, 'i') },
        { description: new RegExp(searchTerm, 'i') },
        { category: new RegExp(searchTerm, 'i') },
      ],
    }));
  } else {
    result = await Product.find();
    return result;
  }
};

const getAllProductByIdFromDB = async (productId: string) => {
  const result = await Product.findOne({ _id: productId });
  return result;
};

const updateProduct = async (updateDoc: TProduct, productId: string) => {
  const result = await Product.findOneAndUpdate(
    { _id: productId },
    { $set: updateDoc },
    { new: true },
  );
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getAllProductByIdFromDB,
  updateProduct,
};

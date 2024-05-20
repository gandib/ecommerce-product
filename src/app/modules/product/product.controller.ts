import { Request, Response } from 'express';
import productValidationSchema from './product.validation';
import { productServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    // zod validation
    const zodParsedData = productValidationSchema.parse(productData);

    // call service function to send this data
    const result = await productServices.createProductIntoDB(zodParsedData);
    // send respons
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error.message,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm }: any = req.query;
    let result;
    if (searchTerm) {
      result = await productServices.getProductsBySearchTermFromDB(searchTerm);
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    } else {
      result = await productServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error.message,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    // get product id
    const { productId } = req.params;
    // call service to send product id
    const result = await productServices.getAllProductByIdFromDB(productId);

    // send response
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error.message,
    });
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getProductById,
};

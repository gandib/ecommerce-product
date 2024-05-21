import { Request, Response } from 'express';
import productValidationSchema from './product.validation';
import { productServices } from './product.service';

// Create product
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
    });
  }
};

// Get All products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm }: any = req.query;
    let result;
    if (searchTerm) {
      result = await productServices.getAllProductsFromDB(searchTerm);

      // response for not product found
      if (result.length === 0) {
        return res.status(200).json({
          success: false,
          message: 'Product not found!',
        });
      }

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
    });
  }
};

// Get product by _id
const getProductById = async (req: Request, res: Response) => {
  try {
    // get product id
    const { productId } = req.params;
    // call service to send product id
    const result = await productServices.getProductByIdFromDB(productId);

    // response for not product found
    if (result === null) {
      return res.status(200).json({
        success: false,
        message: 'Product not found!',
      });
    }

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
    });
  }
};

// Update product by _id
const updateProduct = async (req: Request, res: Response) => {
  try {
    const updateDoc = req.body;
    // get _id
    const { productId } = req.params;

    const result = await productServices.updateProduct(updateDoc, productId);

    // send response
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
    });
  }
};

// Delete product by _id
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteProduct(productId);
    if (result.deletedCount === 1) {
      // send response
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    } else {
      // send response
      res.status(200).json({
        success: false,
        message: 'Product not found!',
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
    });
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

import { Request, Response } from 'express';
import productValidationSchema from './product.validation';
import { productServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    // zod validation
    const zodParsedData = productValidationSchema.parse(productData);

    const result = await productServices.createProductIntoDB(zodParsedData);

    // send respons
    res.status(200).json({
      success: true,
      message: 'Product is created successfully!',
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
};

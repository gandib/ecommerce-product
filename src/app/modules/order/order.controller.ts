import { Request, Response } from 'express';
import { orderServices } from './order.service';
import { Order } from './order.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await orderServices.createOrderIntoDB(orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    let result;

    if (email) {
      result = await orderServices.getAllOrder(email);

      // response for not product found
      if (result.length === 0) {
        return res.status(200).json({
          success: false,
          message: 'Order not found for user email!',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } else {
      result = await orderServices.getAllOrder();
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
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

export const orderControllers = {
  createOrder,
  getAllOrder,
};

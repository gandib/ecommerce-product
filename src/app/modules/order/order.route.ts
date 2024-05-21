import express from 'express';
import { orderControllers } from './order.controller';

const router = express.Router();

router.post('/', orderControllers.createOrder);
// router.get('/', productControllers.getAllProducts);
// router.get('/:productId', productControllers.getProductById);
// router.put('/:productId', productControllers.updateProduct);
// router.delete('/:productId', productControllers.deleteProduct);

export const orderRoutes = router;

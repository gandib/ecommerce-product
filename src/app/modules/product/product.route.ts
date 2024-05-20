import express from 'express';
import { productControllers } from './product.controller';

const router = express.Router();

router.post('/', productControllers.createProduct);

export const productRoutes = router;

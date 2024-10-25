import express from 'express';
import productController from '../controllers/productController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/', productController.getProducts);
router.post('/', isAuthenticated, roleMiddleware(['admin']), productController.createProduct);

export default router;

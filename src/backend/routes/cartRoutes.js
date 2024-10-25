import express from 'express';
import cartController from '../controllers/cartController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:cid', isAuthenticated, cartController.getCartById);
router.post('/:cid/products', isAuthenticated, cartController.addProductToCart);
router.post('/:cid/clear', isAuthenticated, cartController.clearCart);

export default router;

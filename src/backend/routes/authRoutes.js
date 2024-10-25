import express from 'express';
import authController from '../controllers/authController.js';  // Importa el controlador por defecto
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/current', isAuthenticated, authController.currentUser);

export default router;

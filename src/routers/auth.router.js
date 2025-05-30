import {Router} from 'express';
import { authenticateToken  } from '../middlewares/authentication.middleware.js';
import authController from '../auth/auth.controller.js';

const router = Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.put('/changepass', authenticateToken, authController.changePassword);

router.post('/forgotpass', authController.forgotPassword);

router.post('/verifyotp', authController.verifyOTP);

router.post('/resetpass', authController.resetPassword);

export default router;
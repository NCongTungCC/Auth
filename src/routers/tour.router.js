import {Router} from 'express';
import tourController from '../controllers/tour.controller.js';
import { premission } from '../middlewares/auth.middleware.js';
import { authenticateToken  } from '../middlewares/authentication.middleware.js';
const router = Router();

router.post('/tour', tourController.createTour);

router.delete('/tour/:id', authenticateToken, premission("admin"), tourController.deleteTour);

router.put('/tour/:id', tourController.updateTour);

router.get('/tour', tourController.getTour);

router.get('/tour/:id', tourController.getTourById);

export default router;
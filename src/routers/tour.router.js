import {Router} from 'express';
import tourController from '../controllers/tour.controller.js';
const router = Router();

router.post('/tour', tourController.createTour);

export default router;
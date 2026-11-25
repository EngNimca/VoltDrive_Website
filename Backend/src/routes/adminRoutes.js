import { Router } from 'express';
import { getStats } from '../controllers/adminController.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/stats', auth, isAdmin, getStats);

export default router;
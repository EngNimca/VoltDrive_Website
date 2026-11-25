import { Router } from 'express';
import { addFavorite, removeFavorite, getMyFavorites } from '../controllers/favoriteController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/', auth, getMyFavorites);
router.post('/:carId', auth, addFavorite);
router.delete('/:carId', auth, removeFavorite);

export default router;
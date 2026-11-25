import { Router } from 'express';
import { registerUser, loginUser, getMe, updateMe, changePassword } from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', auth, getMe);
router.put('/me', auth, updateMe);
router.put('/password', auth, changePassword);

export default router;
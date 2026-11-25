import { Router } from 'express';
import { getAllUsers, deleteUser } from '../controllers/userController.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = Router();
const admin = [auth, isAdmin];

router.get('/', admin, getAllUsers);
router.delete('/:id', admin, deleteUser);

export default router;
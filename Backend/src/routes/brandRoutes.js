// // import { Router } from 'express'
// // import { getBrands, getBrandBySlug } from '../controllers/brandController.js'

// // const router = Router()

// // router.get('/', getBrands)
// // router.get('/:slug', getBrandBySlug)

// // export default router

// import { Router } from 'express';
// import { getAllBrands, getBrandBySlug } from '../controllers/brandController.js';

// const router = Router();

// router.get('/', getAllBrands);
// router.get('/:slug', getBrandBySlug);

// export default router;

import { Router } from 'express';
import {
    getAllBrands, getBrandBySlug, getBrandById,
    createBrand, updateBrand, deleteBrand,
} from '../controllers/brandController.js';
import { auth, isAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();
const admin = [auth, isAdmin];

router.get('/', getAllBrands);

// Admin (hal sawir: field "logo")
router.get('/id/:id', admin, getBrandById);
router.post('/', admin, upload.single('logo'), createBrand);
router.put('/:id', admin, upload.single('logo'), updateBrand);
router.delete('/:id', admin, deleteBrand);

router.get('/:slug', getBrandBySlug);

export default router;
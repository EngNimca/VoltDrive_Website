// // import { Router } from 'express'
// // import { getCars, getFeaturedCars, getLatestCars, getCarBySlug } from '../controllers/carController.js'

// // const router = Router()

// // router.get('/', getCars)
// // router.get('/featured', getFeaturedCars) // waa inay ka horreeyaan /:slug
// // router.get('/latest', getLatestCars)
// // router.get('/:slug', getCarBySlug)

// // export default router


// import { Router } from 'express';
// import { getAllCars, getFeaturedCars, getLatestCars, getCarBySlug } from '../controllers/carController.js';

// const router = Router();

// router.get('/', getAllCars);
// router.get('/featured', getFeaturedCars); // waa inay ka horreeyaan /:slug
// router.get('/latest', getLatestCars);
// router.get('/:slug', getCarBySlug);

// export default router;

import { Router } from 'express';
import {
    getAllCars, getFeaturedCars, getLatestCars, getCarBySlug,
    getCarById, createCar, updateCar, deleteCar,
} from '../controllers/carController.js';
import { auth, isAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();
const admin = [auth, isAdmin]; // admin kaliya

// Dadweynaha
router.get('/', getAllCars);
router.get('/featured', getFeaturedCars);
router.get('/latest', getLatestCars);

// Admin (sawirro badan: field "images")
router.get('/id/:id', admin, getCarById);
router.post('/', admin, upload.array('images', 8), createCar);
router.put('/:id', admin, upload.array('images', 8), updateCar);
router.delete('/:id', admin, deleteCar);

// Dadweynaha (ugu dambeeya, sababtoo ah /:slug wuxuu qabtaa wax kasta)
router.get('/:slug', getCarBySlug);

export default router;
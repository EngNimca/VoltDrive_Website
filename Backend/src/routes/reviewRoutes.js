// // import { Router } from 'express'
// // import { getReviews, addReview } from '../controllers/reviewController.js'

// // const router = Router()

// // router.get('/:carId', getReviews)
// // router.post('/', addReview)

// // export default router

// import { Router } from 'express';
// import { createReview, getReviewsByCar } from '../controllers/reviewController.js';

// const router = Router();

// router.get('/:carId', getReviewsByCar);
// router.post('/', createReview);

// export default router;

// import { Router } from 'express';
// import { createReview, getReviewsByCar, getAllReviews, deleteReview } from '../controllers/reviewController.js';
// import { auth, isAdmin } from '../middleware/auth.js';

// const router = Router();
// const admin = [auth, isAdmin];

// router.post('/', createReview);
// router.get('/', admin, getAllReviews); // admin: dhammaan reviews
// router.delete('/:id', admin, deleteReview);
// router.get('/:carId', getReviewsByCar);

// export default router;


//
import { Router } from 'express';
import { createReview, getReviewsByCar, getMyReviews, getAllReviews, deleteReview } from '../controllers/reviewController.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = Router();
const admin = [auth, isAdmin];

router.post('/', auth, createReview); // login looga baahan yahay
router.get('/mine', auth, getMyReviews); // waa inay ka horreeyaan /:carId
router.get('/', admin, getAllReviews);
router.delete('/:id', admin, deleteReview);
router.get('/:carId', getReviewsByCar);

export default router;
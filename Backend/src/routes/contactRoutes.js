// // import { Router } from 'express'
// // import { sendInquiry, subscribe } from '../controllers/contactController.js'

// // const router = Router()

// // router.post('/inquiries', sendInquiry)
// // router.post('/subscribe', subscribe)

// // export default router

// import { Router } from 'express';
// import { createInquiry, createSubscriber } from '../controllers/contactController.js';

// const router = Router();

// router.post('/inquiries', createInquiry);
// router.post('/subscribe', createSubscriber);

// export default router;

// import { Router } from 'express';
// import {
//     createInquiry, getAllInquiries, updateInquiry, deleteInquiry,
//     createSubscriber, getAllSubscribers, deleteSubscriber,
// } from '../controllers/contactController.js';
// import { auth, isAdmin } from '../middleware/auth.js';

// const router = Router();
// const admin = [auth, isAdmin];

// // Dadweynaha
// router.post('/inquiries', createInquiry);
// router.post('/subscribe', createSubscriber);

// // Admin
// router.get('/inquiries', admin, getAllInquiries);
// router.put('/inquiries/:id', admin, updateInquiry);
// router.delete('/inquiries/:id', admin, deleteInquiry);
// router.get('/subscribers', admin, getAllSubscribers);
// router.delete('/subscribers/:id', admin, deleteSubscriber);

// export default router;

//
import { Router } from 'express';
import {
    createInquiry, getMyInquiries, getAllInquiries, updateInquiry, deleteInquiry,
    createSubscriber, getAllSubscribers, deleteSubscriber,
} from '../controllers/contactController.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = Router();
const admin = [auth, isAdmin];

// Newsletter: qof kasta
router.post('/subscribe', createSubscriber);

// User (login looga baahan yahay)
router.post('/inquiries', auth, createInquiry);
router.get('/inquiries/mine', auth, getMyInquiries);

// Admin
router.get('/inquiries', admin, getAllInquiries);
router.put('/inquiries/:id', admin, updateInquiry);
router.delete('/inquiries/:id', admin, deleteInquiry);
router.get('/subscribers', admin, getAllSubscribers);
router.delete('/subscribers/:id', admin, deleteSubscriber);

export default router;
// // import { Router } from 'express'
// // import { getArticles, getArticleBySlug } from '../controllers/articleController.js'

// // const router = Router()

// // router.get('/', getArticles)
// // router.get('/:slug', getArticleBySlug)

// // export default router

// import { Router } from 'express';
// import { getAllArticles, getArticleBySlug } from '../controllers/articleController.js';

// const router = Router();

// router.get('/', getAllArticles);
// router.get('/:slug', getArticleBySlug);

// export default router;

import { Router } from 'express';
import {
    getAllArticles, getArticleBySlug, getArticleById,
    createArticle, updateArticle, deleteArticle,
} from '../controllers/articleController.js';
import { auth, isAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();
const admin = [auth, isAdmin];

router.get('/', getAllArticles);

// Admin (hal sawir: field "cover")
router.get('/id/:id', admin, getArticleById);
router.post('/', admin, upload.single('cover'), createArticle);
router.put('/:id', admin, upload.single('cover'), updateArticle);
router.delete('/:id', admin, deleteArticle);

router.get('/:slug', getArticleBySlug);

export default router;
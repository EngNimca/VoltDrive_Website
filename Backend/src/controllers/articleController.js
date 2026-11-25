// import Article from '../models/Article.js'

// // GET /api/articles?category=Guides&page=1
// export const getArticles = async (req, res) => {
//   const page = Number(req.query.page) || 1
//   const limit = 9 // imisa maqaal ayaa bog kasta ku jira

//   const filter = {}
//   if (req.query.category) filter.category = req.query.category

//   const total = await Article.countDocuments(filter)
//   const articles = await Article.find(filter)
//     .select('-content') // qoraalka buuxa liiska kuma baahna
//     .sort({ createdAt: -1 }) // kuwa ugu cusub
//     .skip((page - 1) * limit)
//     .limit(limit)

//   res.json({ articles, pages: Math.ceil(total / limit) })
// }

// // GET /api/articles/my-article : hal maqaal + 3 kale
// export const getArticleBySlug = async (req, res) => {
//   const article = await Article.findOneAndUpdate(
//     { slug: req.params.slug },
//     { $inc: { views: 1 } }, // views +1
//     { new: true }
//   )
//   if (!article) return res.status(404).json({ message: 'Article not found' })

//   const related = await Article.find({ _id: { $ne: article._id } })
//     .select('title slug category')
//     .limit(3)

//   res.json({ article, related })
// }

import Article from '../models/Article.js';
import handleError from '../utils/handleError.js';

// create article (admin): cover hal sawir, multer wuxuu u keenayaa req.file
export const createArticle = async (req, res) => {
    try {
        const { title, category, excerpt, content, author } = req.body;
        // "How AI Works" -> "how-ai-works"
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        const newArticle = new Article({
            title,
            slug,
            category,
            excerpt,
            content,
            author,
            cover: req.file ? `/uploads/${req.file.filename}` : '',
        });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        console.error('Error creating article', error);
        handleError(res, error);
    };
}


// get all articles: ?category=Guides&page=1
export const getAllArticles = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 9; // imisa maqaal ayaa bog kasta ku jira

        const filter = {};
        if (req.query.category) filter.category = req.query.category;

        const total = await Article.countDocuments(filter);
        const articles = await Article.find(filter)
            .select('-content') // qoraalka buuxa liiska kuma baahna
            .sort({ createdAt: -1 }) // kuwa ugu cusub
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({ articles, pages: Math.ceil(total / limit) });
    } catch (error) {
        console.error('Error getting articles', error);
        res.status(500).json({ error: error.message });
    }
};

// get single article by slug (bogga maqaalka: /news/my-article) + 3 kale
export const getArticleBySlug = async (req, res) => {
    try {
        const article = await Article.findOneAndUpdate(
            { slug: req.params.slug },
            { $inc: { views: 1 } }, // views +1
            { new: true }
        );
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        const related = await Article.find({ _id: { $ne: article._id } })
            .select('title slug category')
            .limit(3);
        res.status(200).json({ article, related });
    } catch (error) {
        console.error('Error getting article', error);
        res.status(500).json({ error: error.message });
    }
};

// get single article by id (admin: foomka wax-ka-beddelka)
export const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        console.error('Error getting article', error);
        res.status(500).json({ error: error.message });
    }
};

// update article (admin)
export const updateArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        const { title, category, excerpt, content, author } = req.body;
        if (title) article.title = title; // slug-ka lama beddelo, si URL-ku u sii shaqeeyo
        if (category) article.category = category;
        if (excerpt) article.excerpt = excerpt;
        if (content) article.content = content;
        if (author) article.author = author;
        if (req.file) {
            article.cover = `/uploads/${req.file.filename}`;
        }
        await article.save();
        res.status(200).json(article);
    } catch (error) {
        console.error('Error updating car', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'An article with this title already exists' });
        }
        res.status(500).json({ error: error.message });
    }
};

// delete article (admin)
export const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        await article.deleteOne();
        res.status(200).json({ message: 'Article deleted' });
    } catch (error) {
        console.error('Error deleting article', error);
        res.status(500).json({ error: error.message });
    }
};
// import Review from '../models/Review.js'

// // GET /api/reviews/:carId : reviews-ka gaari
// export const getReviews = async (req, res) => {
//   const reviews = await Review.find({ car: req.params.carId })
//     .select('-email') // email-ka ha muujin
//     .sort({ createdAt: -1 })
//   res.json(reviews)
// }

// // POST /api/reviews : ku dar review
// // Body: { car, name, email, rating, title, comment }
// export const addReview = async (req, res) => {
//   try {
//     const review = await Review.create(req.body)
//     res.status(201).json(review)
//   } catch (err) {
//     res.status(400).json({ message: err.message }) // tusaale: magac ma jiro
//   }
// }

// import Review from '../models/Review.js';

// // create review (dadweynaha)
// export const createReview = async (req, res) => {
//     try {
//         const { car, name, email, rating, title, comment } = req.body;
//         if (!car || !name || !email || !rating || !comment) {
//             return res.status(400).json({ message: 'Name, email, rating and comment are required' });
//         }
//         const newReview = new Review({ car, name, email, rating, title, comment });
//         await newReview.save();
//         res.status(201).json(newReview);
//     } catch (error) {
//         console.error('Error creating review', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // get reviews-ka hal gaari (bogga gaariga)
// export const getReviewsByCar = async (req, res) => {
//     try {
//         const reviews = await Review.find({ car: req.params.carId })
//             .select('-email') // email-ka ha muujin
//             .sort({ createdAt: -1 });
//         res.status(200).json(reviews);
//     } catch (error) {
//         console.error('Error getting reviews', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // get all reviews (admin)
// export const getAllReviews = async (req, res) => {
//     try {
//         const reviews = await Review.find().populate('car', 'name').sort({ createdAt: -1 });
//         res.status(200).json(reviews);
//     } catch (error) {
//         console.error('Error getting reviews', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// // delete review (admin)
// export const deleteReview = async (req, res) => {
//     try {
//         const review = await Review.findById(req.params.id);
//         if (!review) {
//             return res.status(404).json({ message: 'Review not found' });
//         }
//         await review.deleteOne();
//         res.status(200).json({ message: 'Review deleted' });
//     } catch (error) {
//         console.error('Error deleting review', error);
//         res.status(500).json({ error: error.message });
//     }
// };


//
import Review from '../models/Review.js';
import User from '../models/User.js';
import handleError from '../utils/handleError.js';

// create review (user-ka soo galay)
export const createReview = async (req, res) => {
    try {
        const { car, rating, title, comment } = req.body;
        if (!car || !rating || !comment) {
            return res.status(400).json({ message: 'Car, rating and comment are required' });
        }
        const carExists = await Car.findById(car); // gaariga ma jiraa?
        if (!carExists) {
            return res.status(404).json({ message: 'Car not found' });
        }
        const user = await User.findById(req.userId);
        const newReview = new Review({ car, user: req.userId, name: user.name, rating, title, comment });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error creating review', error);
        handleError(res, error);
    }
};

// get reviews-ka hal gaari (bogga gaariga)
export const getReviewsByCar = async (req, res) => {
    try {
        const reviews = await Review.find({ car: req.params.carId }).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error getting reviews', error);
        res.status(500).json({ error: error.message });
    }
};

// get my reviews (user-ka soo galay)
export const getMyReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.userId })
            .populate('car', 'name slug images')
            .sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error getting my reviews', error);
        res.status(500).json({ error: error.message });
    }
};

// get all reviews (admin)
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('car', 'name').sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error getting reviews', error);
        res.status(500).json({ error: error.message });
    }
};

// delete review (admin)
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        await review.deleteOne();
        res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
        console.error('Error deleting review', error);
        res.status(500).json({ error: error.message });
    }
};
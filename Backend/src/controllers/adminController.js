import Car from '../models/Car.js';
import Brand from '../models/Brand.js';
import Article from '../models/Article.js';
import User from '../models/User.js';
import Review from '../models/Review.js';
import Inquiry from '../models/Inquiry.js';
import Subscriber from '../models/Subscriber.js';
import handleError from '../utils/handleError.js';

// get stats (admin): tirooyinka Overview
export const getStats = async (req, res) => {
    try {
        const stats = {
            cars: await Car.countDocuments(),
            brands: await Brand.countDocuments(),
            articles: await Article.countDocuments(),
            users: await User.countDocuments(),
            reviews: await Review.countDocuments(),
            subscribers: await Subscriber.countDocuments(),
            inquiries: await Inquiry.countDocuments(),
            newInquiries: await Inquiry.countDocuments({ status: 'new' }), // weli la ma eegin
        };
        res.status(200).json(stats);
    } catch (error) {
        console.error('Error getting stats', error);
        handleError(res, error);
    }
};
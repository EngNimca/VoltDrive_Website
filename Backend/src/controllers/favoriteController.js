import User from '../models/User.js';
import Car from '../models/Car.js';
import handleError from '../utils/handleError.js';

// add favorite (user-ka soo galay)
export const addFavorite = async (req, res) => {
    try {
        const car = await Car.findById(req.params.carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        // $addToSet = ku dar kaliya haddii aanu hore u jirin (isku mid labo jeer ma soo galo)
        await User.findByIdAndUpdate(req.userId, { $addToSet: { favorites: car._id } });
        res.status(200).json({ message: 'Added to favorites' });
    } catch (error) {
        console.error('Error adding favorite', error);
        handleError(res, error);
    }
};

// remove favorite
export const removeFavorite = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.userId, { $pull: { favorites: req.params.carId } });
        res.status(200).json({ message: 'Removed from favorites' });
    } catch (error) {
        console.error('Error removing favorite', error);
        handleError(res, error);
    }
};

// get my favorites
export const getMyFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate({
            path: 'favorites',
            populate: { path: 'brand', select: 'name slug logo' }, // brand-ka gaari kasta
        });
        res.status(200).json(user.favorites);
    } catch (error) {
        console.error('Error getting favorites', error);
        handleError(res, error);
    }
};
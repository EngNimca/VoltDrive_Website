import User from '../models/User.js';
import handleError from '../utils/handleError.js';

// get all users (admin): liiska + tirada
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 }); // password ha muujin
        const admins = users.filter((u) => u.role === 'admin').length;
        res.status(200).json({
            total: users.length,
            admins,
            regularUsers: users.length - admins,
            users,
        });
    } catch (error) {
        console.error('Error getting users', error);
        handleError(res, error);
    }
};

// delete user (admin): admin lama tirtiri karo
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role === 'admin') {
            return res.status(403).json({ message: 'Cannot delete an admin' });
        }
        await user.deleteOne();
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        console.error('Error deleting user', error);
        handleError(res, error);
    }
};
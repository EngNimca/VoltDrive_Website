import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import handleError from '../utils/handleError.js';

// token samee: 7 maalmood ayuu shaqeynayaa (beddel haddii aad rabto)
const makeToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

// qaybta user-ka ee la soo celiyo (password la'aan)
const userData = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role });// register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: 'Email already used' });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });
        res.status(201).json({ token: makeToken(user), user: userData(user) });
    } catch (error) {
        console.error('Error registering user', error);
        handleError(res, error);
    }
};

// login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ token: makeToken(user), user: userData(user) });
    } catch (error) {
        console.error('Error logging in', error);
        res.status(500).json({ error: error.message });
    }
};

// get my profile (req.userId wuxuu ka imanayaa auth middleware)
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user', error);
        res.status(500).json({ error: error.message });
    }
};

// update my profile (magaca)
export const updateMe = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const user = await User.findByIdAndUpdate(req.userId, { name }, { new: true });
        res.status(200).json(userData(user));
    } catch (error) {
        console.error('Error updating profile', error);
        handleError(res, error);
    }
};

// change password
export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Old and new password are required' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }
        const user = await User.findById(req.userId);
        if (!(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(400).json({ message: 'Old password is wrong' });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.status(200).json({ message: 'Password changed' });
    } catch (error) {
        console.error('Error changing password', error);
        handleError(res, error);
    }
};
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

await mongoose.connect(process.env.MONGO_URI);

const exists = await User.findOne({ email: process.env.ADMIN_EMAIL });
if (exists) {
    console.log('Admin already exists');
} else {
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await User.create({ name: 'Admin', email: process.env.ADMIN_EMAIL, password, role: 'admin' });
    console.log('Admin created');
}

await mongoose.disconnect();
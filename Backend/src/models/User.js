import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }, // la qariyay (bcrypt)
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }], // gaadiidka la keydiyay
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema);
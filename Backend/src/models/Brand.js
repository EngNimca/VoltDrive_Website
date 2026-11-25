import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        logo: String,
        description: String,
        website: String
    },
    { timestamps: true } // createdAt iyo updatedAt si toos ah
);

export default mongoose.model('Brand', brandSchema)
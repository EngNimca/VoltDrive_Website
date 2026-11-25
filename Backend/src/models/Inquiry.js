// import mongoose from 'mongoose'

// const inquirySchema = new mongoose.Schema(
//   {
//     car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' }, // ikhtiyaari
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: String,
//     message: String,
//     type: { type: String, enum: ['test-drive', 'contact', 'price'], default: 'contact' },
//     status: { type: String, enum: ['new', 'done'], default: 'new' }, // admin-ku wuu beddelaa
//   },
//   { timestamps: true }
// )

// export default mongoose.model('Inquiry', inquirySchema)

import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // qofka soo diray
        car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' }, // ikhtiyaari
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: String,
        message: String,
        type: { type: String, enum: ['test-drive', 'contact', 'price'], default: 'contact' },
        status: { type: String, enum: ['new', 'done'], default: 'new' }, // admin-ku wuu beddelaa
    },
    { timestamps: true }
);

export default mongoose.model('Inquiry', inquirySchema);
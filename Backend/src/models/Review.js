// import mongoose from 'mongoose'

// const reviewSchema = new mongoose.Schema(
//   {
//     car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
//     name: { type: String, required: true },
//     email: { type: String, required: true }, // dadweynaha lama muujiyo
//     rating: { type: Number, required: true, min: 1, max: 5 }, // xiddigo
//     title: String,
//     comment: { type: String, required: true },
//   },
//   { timestamps: true }
// )

// export default mongoose.model('Review', reviewSchema)

import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // qofka qoray
        name: { type: String, required: true }, // magaca user-ka (la muujiyo)
        rating: { type: Number, required: true, min: 1, max: 5 }, // xiddigo
        title: String,
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
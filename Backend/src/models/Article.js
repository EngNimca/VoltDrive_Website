import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // URL: /news/my-article
    cover: String, // sawirka
    category: {
      type: String,
      enum: ['Launches', 'Reviews', 'Policy', 'Technology', 'Guides'], // beddel haddii aad rabto
      required: true,
    },
    excerpt: String, // qoraal gaaban (card-ka)
    content: String, // qoraalka buuxa
    author: { type: String, default: 'Admin' },
    views: { type: Number, default: 0 },
  },
  { timestamps: true } // createdAt = taariikhda
)

export default mongoose.model('Article', articleSchema)
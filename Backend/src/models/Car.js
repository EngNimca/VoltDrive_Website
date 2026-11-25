import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    name: {
        type: String,  
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
    tagline: String, // sharaxaad gaaban // Nooca gaariga: beddel liiska haddii aad rabto
    bodyType: {
      type: String,
      enum: ['SUV', 'Sedan', 'Hatchback', 'MPV', 'Coupe', 'Crossover'],
      required: true,
    },
    condition: { 
        type: String, 
        enum: ['new', 'used'], 
        default: 'new' },
    year: Number,
    price: { type: Number, required: true }, // USD
    mileage: Number, // km (gaadiidka la isticmaalay)
    images: [String], // liiska sawirrada

    isFeatured: { 
        type: Boolean, 
        default: false }, // muuq "Featured Cars"
    isLatest: { 
        type: Boolean, 
        default: false }, // muuq "Latest Arrivals"
    status: { 
        type: String, 
        enum: ['available', 'sold'], 
        default: 'available' 
    },

  // Specs: range = km, battery = kWh, power = kW
    specs: {
      range: Number,
      battery: Number,
      charging: String,
      power: Number,
      seats: Number,
    },
    about: String,
    variants: [{ name: String, price: Number, range: Number, battery: Number }],
    pros: [String],
    cons: [String],
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);
carSchema.index({ name: 'text' }) // si loogu raadiyo magaca

export default mongoose.model('Car', carSchema)
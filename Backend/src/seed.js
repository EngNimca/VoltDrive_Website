import 'dotenv/config'
import mongoose from 'mongoose'
import Brand from './models/Brand.js'
import Car from './models/Car.js'
import Article from './models/Article.js'

// "Tesla Model Y" -> "tesla-model-y"
const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-')

// Sawirrada: Backend/uploads/cars/tesla-model-y.jpg iyo Backend/uploads/brands/tesla.png
const CAR_EXT = 'jpg' // beddel: png ama webp, sida sawirradaada
const LOGO_EXT = 'png'

const brands = [
  { name: 'Tesla', description: 'Electric cars and clean energy.' },
  { name: 'BYD', description: 'Affordable, long-range electric vehicles.' },
  { name: 'Kia', description: 'Stylish and practical electric cars.' },
  { name: 'Hyundai', description: 'Smart electric mobility for everyone.' },
  { name: 'BMW', description: 'Premium performance, now electric.' },
  { name: 'Toyota', description: 'Reliable cars trusted worldwide.' },
]

// Wixii aan halkan lagu qorin (about, pros, cons) waxay helayaan kuwan
const base = {
  about: 'Spacious, efficient and comfortable. Perfect for daily driving and long trips.',
  pros: ['Low running cost', 'Quiet and smooth drive', 'Fast charging'],
  cons: ['Higher upfront price', 'Charging network still growing'],
}

const cars = [
  { name: 'Tesla Model Y', brand: 'Tesla', bodyType: 'SUV', price: 44990, year: 2025, tagline: 'Family electric SUV',
    isFeatured: true, isLatest: true, specs: { range: 533, battery: 75, charging: '10-80% in 27 min', power: 220, seats: 5 } },
  { name: 'Tesla Model 3', brand: 'Tesla', bodyType: 'Sedan', price: 38990, year: 2025, tagline: 'Sporty electric sedan',
    isFeatured: true, specs: { range: 513, battery: 60, charging: '10-80% in 25 min', power: 208, seats: 5 } },
  { name: 'BYD Sealion 7', brand: 'BYD', bodyType: 'SUV', price: 49400, year: 2025, tagline: 'Pure performance eSUV',
    isFeatured: true, isLatest: true, specs: { range: 502, battery: 82, charging: '10-80% in 24 min', power: 230, seats: 5 } },
  { name: 'BYD Atto 3', brand: 'BYD', bodyType: 'Crossover', price: 33990, year: 2024, tagline: 'Smart compact crossover',
    isFeatured: true, specs: { range: 420, battery: 60, charging: '30-80% in 29 min', power: 150, seats: 5 } },
  { name: 'Kia EV6', brand: 'Kia', bodyType: 'Crossover', price: 42600, year: 2025, tagline: 'Fast and futuristic',
    isFeatured: true, isLatest: true, specs: { range: 528, battery: 77, charging: '10-80% in 18 min', power: 168, seats: 5 } },
  { name: 'Kia EV9', brand: 'Kia', bodyType: 'SUV', price: 61000, year: 2025, tagline: 'Three-row electric SUV',
    isFeatured: true, isLatest: true, specs: { range: 541, battery: 99, charging: '10-80% in 24 min', power: 283, seats: 7 } },
  { name: 'Hyundai Ioniq 5', brand: 'Hyundai', bodyType: 'Crossover', price: 41800, year: 2024, tagline: 'Retro-futuristic design',
    specs: { range: 507, battery: 77, charging: '10-80% in 18 min', power: 168, seats: 5 } },
  { name: 'Hyundai Kona Electric', brand: 'Hyundai', bodyType: 'SUV', price: 21500, year: 2022, tagline: 'Great value, low mileage',
    condition: 'used', mileage: 38000, specs: { range: 484, battery: 64, charging: '10-80% in 47 min', power: 150, seats: 5 } },
  { name: 'BMW iX3', brand: 'BMW', bodyType: 'SUV', price: 68000, year: 2025, tagline: 'Premium electric SUV',
    specs: { range: 461, battery: 80, charging: '10-80% in 32 min', power: 210, seats: 5 } },
  { name: 'Toyota bZ4X', brand: 'Toyota', bodyType: 'SUV', price: 43000, year: 2024, tagline: 'Reliable electric SUV',
    specs: { range: 470, battery: 71, charging: '10-80% in 30 min', power: 150, seats: 5 } },
]

const articles = [
  { title: 'How to Choose Your First Electric Car', slug: 'choose-first-electric-car', category: 'Guides',
    excerpt: 'Range, charging and price: the three things to check before you buy.',
    content: 'Start with how far you drive each day. Then check charging at home and on the road, and compare the total cost, not only the price.' },
  { title: 'Buying a Used Electric Car: What to Check', slug: 'buying-used-electric-car', category: 'Guides',
    excerpt: 'Battery health, service history and warranty matter most.',
    content: 'Ask for a battery health report and the full service history. A remaining battery warranty is a big plus.' },
  { title: 'Fast Charging Explained', slug: 'fast-charging-explained', category: 'Technology',
    excerpt: 'Why charging from 10% to 80% is quick, and the last 20% is slow.',
    content: 'Chargers push the most power when the battery is low. As it fills up, the car slows the speed to protect the battery.' },
  { title: 'Tesla Model Y vs Kia EV6', slug: 'model-y-vs-ev6', category: 'Reviews',
    excerpt: 'Two popular family EVs compared on space, range and price.',
    content: 'Both cars are comfortable and fast to charge. Compare boot space, range and price to see which one fits your family.' },
  { title: 'New Electric Cars Arriving This Year', slug: 'new-electric-cars-arriving', category: 'Launches',
    excerpt: 'A quick look at the new models coming to showrooms.',
    content: 'More brands are launching affordable electric SUVs. Check our Latest Arrivals to see what has just landed.' },
  { title: 'Why More Countries Support Electric Cars', slug: 'countries-support-electric-cars', category: 'Policy',
    excerpt: 'Tax benefits and charging plans are making EVs cheaper to own.',
    content: 'Many governments reduce taxes on electric cars and build public chargers. This lowers the cost of owning one.' },
]
await mongoose.connect(process.env.MONGO_URI)

// FIIRO GAAR AH: tani waxay tirtiraa xogta hore. Ha ordin kadib marka xog dhab ah la geliyo!
await Brand.deleteMany()
await Car.deleteMany()
await Article.deleteMany()

// Kaydi brands-ka, kadibna hel id-ga mid kasta: { Tesla: id, BYD: id ... }
const savedBrands = await Brand.insertMany(
  brands.map((b) => ({
    ...b,
    slug: slugify(b.name),
    logo: `/uploads/brands/${slugify(b.name)}.${LOGO_EXT}`,
  }))
)

const brandId = {}
savedBrands.forEach((b) => (brandId[b.name] = b._id))

// Kaydi gaadiidka
await Car.insertMany(
  cars.map((c) => ({
    ...base,
    ...c,
    slug: slugify(c.name),
    images: [`/uploads/cars/${slugify(c.name)}.${CAR_EXT}`],
    brand: brandId[c.brand], // magaca brand-ka ku beddel id
    variants: [{ name: 'Standard', price: c.price, range: c.specs.range, battery: c.specs.battery }],
  }))
)
// Sawirka: Backend/uploads/news/<slug>.jpg
await Article.insertMany(articles.map((a) => ({ ...a, cover: `/uploads/news/${a.slug}.jpg` })))

console.log(`Seed dhammaystiran: ${brands.length} brands, ${cars.length} cars`)
await mongoose.disconnect()
// import Brand from '../models/Brand.js'
// import Car from '../models/Car.js'

// // GET /api/brands : dhammaan brands + tirada gaadiidka mid kasta
// export const getBrands = async (req, res) => {
//   const brands = await Brand.find().sort({ name: 1 }).lean() // lean() = xog caadi ah, si aan wax ugu darno
//   for (const b of brands) {
//     b.carCount = await Car.countDocuments({ brand: b._id })
//   }
//   res.json(brands)
// }

// // GET /api/brands/kia : hal brand + gaadiidkiisa
// export const getBrandBySlug = async (req, res) => {
//   const brand = await Brand.findOne({ slug: req.params.slug })
//   if (!brand) return res.status(404).json({ message: 'Brand not found' })

//   const cars = await Car.find({ brand: brand._id }).populate('brand', 'name slug logo')
//   res.json({ brand, cars })
// }

import Brand from '../models/Brand.js';
import Car from '../models/Car.js';
import handleError from '../utils/handleError.js';

// create brand (admin): logo hal sawir, multer wuxuu u keenayaa req.file
export const createBrand = async (req, res) => {
    try {
        const { name, description, website } = req.body;
        // "Mercedes Benz" -> "mercedes-benz"
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        const newBrand = new Brand({
            name,
            slug,
            description,
            website,
            logo: req.file ? `/uploads/${req.file.filename}` : '',
        });
        await newBrand.save();
        res.status(201).json(newBrand);
    } catch (error) {
        console.error('Error creating brand', error);
        handleError(res, error);
};
}

// get all brands + tirada gaadiidka mid kasta
export const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find().sort({ name: 1 }).lean(); // lean() = xog caadi ah, si aan wax ugu darno
        for (const b of brands) {
            b.carCount = await Car.countDocuments({ brand: b._id });
        }
        res.status(200).json(brands);
    } catch (error) {
        console.error('Error getting brands', error);
        res.status(500).json({ error: error.message });
    }
};

// get single brand by slug (bogga brand-ka: /brands/kia) + gaadiidkiisa
export const getBrandBySlug = async (req, res) => {
    try {
        const brand = await Brand.findOne({ slug: req.params.slug });
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        const cars = await Car.find({ brand: brand._id }).populate('brand', 'name slug logo');
        res.status(200).json({ brand, cars });
    } catch (error) {
        console.error('Error getting brand', error);
        res.status(500).json({ error: error.message });
    }
};

// get single brand by id (admin: foomka wax-ka-beddelka)
export const getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.status(200).json(brand);
    } catch (error) {
        console.error('Error getting brand', error);
        res.status(500).json({ error: error.message });
    }
};

// update brand (admin)
export const updateBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        const { name, description, website } = req.body;
        if (name) brand.name = name; // slug-ka lama beddelo, si URL-ku u sii shaqeeyo
        if (description) brand.description = description;
        if (website) brand.website = website;
        if (req.file) {
            brand.logo = `/uploads/${req.file.filename}`;
        }
        await brand.save();
        res.status(200).json(brand);
    } catch (error) {
        console.error('Error updating car', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'A brand with this name already exists' });
        }
        res.status(500).json({ error: error.message });
    }
};

// delete brand (admin)
export const deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        await brand.deleteOne();
        res.status(200).json({ message: 'Brand deleted' });
    } catch (error) {
        console.error('Error deleting brand', error);
        res.status(500).json({ error: error.message });
    }
};
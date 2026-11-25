
// // GET /api/cars
// // export const getCars = async (req, res) => {
// //   try {
// //     const cars = await Car.find().populate('brand', 'name slug logo')
// //     res.json(cars)
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error' })
// //   }
// // }

// // // GET /api/cars/:slug
// // export const getCarBySlug = async (req, res) => {
// //   try {
// //     const car = await Car.findOne({ slug: req.params.slug }).populate('brand', 'name slug logo')
// //     if (!car) {
// //       return res.status(404).json({ message: 'Car not found' })
// //     }
// //     res.json(car)
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error' })
// //   }
// // }

// // new carController.js
// import Car from '../models/Car.js'

// // GET /api/cars?brand=ID&bodyType=SUV&minPrice=20000&maxPrice=50000&sort=price-asc&page=1
// export const getCars = async (req, res) => {
//   const { brand, bodyType, minPrice, maxPrice, sort } = req.query
//   const page = Number(req.query.page) || 1
//   const limit = 9 // imisa gaari ayaa bog kasta ku jira

//   // Filter: wixii la soo diro oo kaliya ayaa lagu darayaa
//   const filter = {}
//   if (brand) filter.brand = brand
//   if (bodyType) filter.bodyType = bodyType
//   if (minPrice || maxPrice) filter.price = { $gte: minPrice || 0, $lte: maxPrice || 99999999 }

//   // Kala saarid: caadi ahaan kuwa ugu cusub
//   let sortBy = { createdAt: -1 }
//   if (sort === 'price-asc') sortBy = { price: 1 }
//   if (sort === 'price-desc') sortBy = { price: -1 }

//   const total = await Car.countDocuments(filter)
//   const cars = await Car.find(filter)
//     .populate('brand', 'name slug logo') // ku dar magaca brand-ka
//     .sort(sortBy)
//     .skip((page - 1) * limit)
//     .limit(limit)

//   res.json({ cars, total, pages: Math.ceil(total / limit) })
// }

// // GET /api/cars/featured : gaadiidka "Featured" (Home)
// export const getFeaturedCars = async (req, res) => {
//   const cars = await Car.find({ isFeatured: true }).populate('brand', 'name slug logo').limit(6)
//   res.json(cars)
// }

// // GET /api/cars/latest : "Latest Arrivals" (Home)
// export const getLatestCars = async (req, res) => {
//   const cars = await Car.find({ isLatest: true }).populate('brand', 'name slug logo').limit(4)
//   res.json(cars)
// }

// // GET /api/cars/tesla-model-y : hal gaari + gaadiid la mid ah
// export const getCarBySlug = async (req, res) => {
//   const car = await Car.findOne({ slug: req.params.slug }).populate('brand', 'name slug logo')
//   if (!car) return res.status(404).json({ message: 'Car not found' })

//   // Similar: isla nooc, ma aha gaariga hadda
//   const similar = await Car.find({ bodyType: car.bodyType, _id: { $ne: car._id } })
//     .populate('brand', 'name slug logo')
//     .limit(3)

//   res.json({ car, similar })
// }

import Car from '../models/Car.js';
import handleError from '../utils/handleError.js';

// create car (admin): sawirro badan, multer wuxuu u keenayaa req.files
export const createCar = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Images are required' });
        }
        const images = req.files.map((file) => `/uploads/${file.filename}`);
        // "Tesla Model Y" -> "tesla-model-y"
        const slug = req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        const newCar = new Car({ ...req.body, slug, images });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        console.error('Error creating car', error);
       handleError(res, error);
    }
};

// get all cars: ?brand=ID&bodyType=SUV&minPrice=20000&maxPrice=50000&sort=price-asc&page=1
export const getAllCars = async (req, res) => {
    try {
        const { brand, bodyType, minPrice, maxPrice, sort, q } = req.query;
        const page = Number(req.query.page) || 1;
        const limit = 9; // imisa gaari ayaa bog kasta ku jira

        const filter = {};
        if (brand) filter.brand = brand;
        if (bodyType) filter.bodyType = bodyType;
            // Raadin magac (q): xarfaha gaarka ah waa la ilaaliyaa si error uusan u dhicin
        if (q) filter.name = { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
        if (minPrice || maxPrice) filter.price = { $gte: minPrice || 0, $lte: maxPrice || 99999999 };

        let sortBy = { createdAt: -1 }; // caadi ahaan: kuwa ugu cusub
        if (sort === 'price-asc') sortBy = { price: 1 };
        if (sort === 'price-desc') sortBy = { price: -1 };

        const total = await Car.countDocuments(filter);
        const cars = await Car.find(filter)
            .populate('brand', 'name slug logo')
            .sort(sortBy)
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({ cars, total, pages: Math.ceil(total / limit) });
    } catch (error) {
        console.error('Error getting cars', error);
        handleError(res, error);
    }
};

// featured cars (Home)
export const getFeaturedCars = async (req, res) => {
    try {
        const cars = await Car.find({ isFeatured: true }).populate('brand', 'name slug logo').limit(6);
        res.status(200).json(cars);
    } catch (error) {
        console.error('Error getting featured cars', error);
        res.status(500).json({ error: error.message });
    }
};

// latest cars (Home)
export const getLatestCars = async (req, res) => {
    try {
        const cars = await Car.find({ isLatest: true }).populate('brand', 'name slug logo').limit(4);
        res.status(200).json(cars);
    } catch (error) {
        console.error('Error getting latest cars', error);
        res.status(500).json({ error: error.message });
    }
};

// get single car by slug (bogga gaariga: /cars/tesla-model-y) + gaadiid la mid ah
export const getCarBySlug = async (req, res) => {
    try {
        const car = await Car.findOne({ slug: req.params.slug }).populate('brand', 'name slug logo');
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        const similar = await Car.find({ bodyType: car.bodyType, _id: { $ne: car._id } })
            .populate('brand', 'name slug logo')
            .limit(3);
        res.status(200).json({ car, similar });
    } catch (error) {
        console.error('Error getting car', error);
        res.status(500).json({ error: error.message });
    }
};

// get single car by id (admin: foomka wax-ka-beddelka)
export const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        console.error('Error getting car', error);
        handleError(res, error);
    }
};

// update car (admin)
export const updateCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        car.set(req.body); // wixii la soo diro oo dhan ayaa la beddelayaa
        if (req.files && req.files.length > 0) {
            car.images = req.files.map((file) => `/uploads/${file.filename}`);
        }
        await car.save();
        res.status(200).json(car);
    }   catch (error) {
        console.error('Error updating car', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'A car with this name already exists' });
        }
        res.status(500).json({ error: error.message });
    }
}

// delete car (admin)
export const deleteCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        await car.deleteOne();
        res.status(200).json({ message: 'Car deleted' });
    } catch (error) {
        console.error('Error deleting car', error);
        res.status(500).json({ error: error.message });
    }
};
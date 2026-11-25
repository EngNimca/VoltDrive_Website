// import Inquiry from '../models/Inquiry.js'
// import Subscriber from '../models/Subscriber.js'

// // POST /api/inquiries : foomka "Book a Test Drive" / "Contact"
// // Body: { car, name, phone, email, message, type }
// export const sendInquiry = async (req, res) => {
//   try {
//     await Inquiry.create(req.body)
//     res.status(201).json({ message: 'Inquiry sent' })
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// }

// // POST /api/subscribe : newsletter
// // Body: { name, email }
// export const subscribe = async (req, res) => {
//   try {
//     await Subscriber.create(req.body)
//     res.status(201).json({ message: 'Subscribed' })
//   } catch (err) {
//     const message = err.code === 11000 ? 'Already subscribed' : err.message // 11000 = email hore ayuu jiray
//     res.status(400).json({ message })
//   }
// }

import Inquiry from '../models/Inquiry.js';
import Subscriber from '../models/Subscriber.js';
import handleError from '../utils/handleError.js';

// ---------- INQUIRY (foomka Test Drive / Contact) ----------

// create inquiry (user-ka soo galay): Test Drive / Contact
export const createInquiry = async (req, res) => {
    try {
        const { car, name, phone, email, message, type } = req.body;
        if (!name || !phone) {
            return res.status(400).json({ message: 'Name and phone are required' });
        }
        const newInquiry = new Inquiry({ user: req.userId, car, name, phone, email, message, type });
        await newInquiry.save();
        res.status(201).json({ message: 'Inquiry sent' });
    } catch (error) {
        console.error('Error creating inquiry', error);
        handleError(res, error);
    }
};

// get my inquiries (user-ka soo galay)
export const getMyInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find({ user: req.userId })
            .populate('car', 'name slug images')
            .sort({ createdAt: -1 });
        res.status(200).json(inquiries);
    } catch (error) {
        console.error('Error getting my inquiries', error);
        res.status(500).json({ error: error.message });
    }
};

// get all inquiries (admin)
export const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().populate('car', 'name').sort({ createdAt: -1 });
        res.status(200).json(inquiries);
    } catch (error) {
        console.error('Error getting inquiries', error);
        res.status(500).json({ error: error.message });
    }
};

// update inquiry (admin): status beddel ("new" -> "done")
export const updateInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        if (req.body.status) inquiry.status = req.body.status;
        await inquiry.save();
        res.status(200).json(inquiry);
    } catch (error) {
        console.error('Error updating inquiry', error);
        res.status(500).json({ error: error.message });
    }
};

// delete inquiry (admin)
export const deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        await inquiry.deleteOne();
        res.status(200).json({ message: 'Inquiry deleted' });
    } catch (error) {
        console.error('Error deleting inquiry', error);
        res.status(500).json({ error: error.message });
    }
};

// ---------- SUBSCRIBER (newsletter) ----------

// create subscriber (dadweynaha)
export const createSubscriber = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const exists = await Subscriber.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: 'Already subscribed' });
        }
        const newSubscriber = new Subscriber({ name, email });
        await newSubscriber.save();
        res.status(201).json({ message: 'Subscribed' });
    } catch (error) {
        console.error('Error subscribing', error);
        res.status(500).json({ error: error.message });
    }
};

// get all subscribers (admin)
export const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ createdAt: -1 });
        res.status(200).json(subscribers);
    } catch (error) {
        console.error('Error getting subscribers', error);
        res.status(500).json({ error: error.message });
    }
};

// delete subscriber (admin)
export const deleteSubscriber = async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        await subscriber.deleteOne();
        res.status(200).json({ message: 'Subscriber deleted' });
    } catch (error) {
        console.error('Error deleting subscriber', error);
        res.status(500).json({ error: error.message });
    }
};
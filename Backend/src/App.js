import express from "express";
import cors from "cors";
import helmet from "helmet";
import carRoutes from './routes/carRoutes.js'
import brandRoutes from './routes/brandRoutes.js'
import articleRoutes from './routes/articleRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'         // CUSUB
import favoriteRoutes from './routes/favoriteRoutes.js' // CUSUB
import adminRoutes from './routes/adminRoutes.js'       // CUSUB

const app = express();

// crossOriginResourcePolicy: false = Frontend-ku wuu arki karaa sawirrada Backend-ka
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.set('json spaces', 2); // JSON-ka nadiif ugu soo bandhig (key kasta sadar u gaar ah)

// Sawirrada: folder Backend/uploads -> localhost:5000/uploads/...
app.use('/uploads', express.static('uploads'))


app.use('/api/cars', carRoutes)
app.use('/api/brands', brandRoutes)
app.use('/api/articles', articleRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api', contactRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes)         // CUSUB
app.use('/api/favorites', favoriteRoutes) // CUSUB
app.use('/api/admin', adminRoutes)        // CUSUB



app.get("/", (req, res) => {
    res.json({ status: 'ok', message: 'VoltDrive API is running' });
});

// 1. URL aan jirin
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// 2. Khaladaadka guud (JSON khalad ah, sawir khalad ah...)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON: check commas, quotes and brackets' })
  }
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: `Upload error: ${err.message} (${err.field || 'file'})` })
  }
  res.status(err.status || 400).json({ message: err.message })
})

export default app;
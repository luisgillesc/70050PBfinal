import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: '*',  // Permitir solicitudes de cualquier origen
    credentials: true
  }));

// Configurar CORS
//app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Permitir peticiones desde el frontend
  //credentials: true, // Para habilitar el uso de cookies
//}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Rutas
app.use('/api/sessions', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { db } from './sqlite.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';
import contactRoutes from './routes/contact.js';
import batteryRoutes from './routes/battery.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Static frontend
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/batteries', batteryRoutes);


// Serve SPA-ish pages directly
const pages = new Set(['/', '/products.html', '/product.html', '/contact.html', '/cart.html', '/login.html', '/register.html']);
app.get('*', (req, res, next) => {
  if (pages.has(req.path)) {
    res.sendFile(path.join(__dirname, 'public', req.path === '/' ? 'index.html' : req.path));
  } else {
    next();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Battery Store server running on http://localhost:${PORT}`);
});

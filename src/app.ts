import express from 'express';
import productRoutes from './routes/productRoutes';
import wishlistRoutes from './routes/wishlistRoutes';

const app = express();

app.use(express.json());
app.use('/products', productRoutes);
app.use('/wishlist', wishlistRoutes);

export default app;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth';
import referrersRoutes from './routes/referrers';
import refereesRoutes from './routes/referees';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/referrers', referrersRoutes);
app.use('/api/referees', refereesRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

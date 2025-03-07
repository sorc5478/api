require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const authRoutes = require('./controllers/auth.controller');
const { errorHandler } = require('./middlewares/error.middleware');
const { apiLimiter } = require('./middlewares/rate-limit.middleware');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MySQL
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// 對所有API請求使用基本的速率限制
app.use('/api', apiLimiter);

// 路由
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
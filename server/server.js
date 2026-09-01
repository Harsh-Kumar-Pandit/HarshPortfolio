const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Initialize database connection
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Basic API Root Route

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Portfolio backend is running"
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Harsh.dev Portfolio API',
    status: 'Healthy',
    version: '1.0.0',
  });
});

// Mounting Routes
app.use('/api/contact', require('./routes/contactRoutes'));

// Placeholder Routes for Future Scalability (CMS Expansion)
app.get('/api/projects', (req, res) => {
  res.json({
    success: true,
    message: 'Future Projects API - Ready for DB population',
    data: [],
  });
});

app.get('/api/site-content', (req, res) => {
  res.json({
    success: true,
    message: 'Future Site Content API - Ready for DB configuration',
    data: {},
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

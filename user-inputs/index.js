require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/inputRoute');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const dbconnect = async () => {
  try {
    // await mongoose.connect('mongodb://127.0.0.1:27017/personal');
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process if DB connection fails
  }
};

dbconnect();
// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API Gateway is running' });
});


app.use('/api/input', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

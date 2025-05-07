require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const contractorRoutes = require('./routes/contractorRoute');

const app = express();
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

app.use('/api/contractor', contractorRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

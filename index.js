require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const enquiryRoutes = require('./src/routes/EnquiryRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'https://vidhyaeducation-8aa07.web.app', // Allow frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, // Allow credentials
}));
app.options('*', cors()); // Handle preflight requests

app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI; // Use Render Environment Variable

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/enquiries', enquiryRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const enquiryRoutes = require('./src/routes/EnquiryRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load environment variables
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/VidhyaEdu';
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/enquiries', enquiryRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

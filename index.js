const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const enquiryRoutes = require('./src/routes/EnquiryRoutes');

const app = express();

// ✅ Correctly configure CORS middleware
app.use(cors({
  origin: 'https://vidhyaeducation-8aa07.web.app', // Allow requests from Firebase frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow required headers
  credentials: true, // Allow credentials (if needed)
}));

app.use(express.json());

// ✅ Use environment variable for MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/enquiries', enquiryRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

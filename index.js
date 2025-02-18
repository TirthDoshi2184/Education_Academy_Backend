if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // Load environment variables only in development
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const enquiryRoutes = require("./src/routes/EnquiryRoutes");
const paymentRoutes = require("./src/routes/PaymentRoute");

const app = express();

// CORS Configuration
const allowedOrigins = [
  "https://vidhyaeducation.co.in",
  "https://www.vidhyaeducation.co.in",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stop server if DB connection fails
  });

// Routes
app.use("/enquiries", enquiryRoutes);
app.use("/payment", paymentRoutes);

// Global Error Handler (Prevents Crashes)
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server is running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});

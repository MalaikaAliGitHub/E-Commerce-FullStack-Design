const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
      console.log("✅ MongoDB Connected Successfully!");
  })
  .catch((err) => {
      console.error("❌ MongoDB Connection Error:", err);
  });

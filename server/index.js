require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employees');

const app = express();
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/employeeDB';

// MongoDB Connection
mongoose.connect(mongoUrl, { 
  useUnifiedTopology: true, 
  useNewUrlParser: true 
})
  .then(() => console.log('Connected to MongoDB via Mongoose'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/employees', employeeRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
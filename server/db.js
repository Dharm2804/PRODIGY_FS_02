const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost:27017/employeeDB'; // Add database name
mongoose.connect(mongoUrl, { 
  useUnifiedTopology: true, 
  useNewUrlParser: true 
})
  .then(() => console.log('Connected to MongoDB via Mongoose'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

module.exports = mongoose;
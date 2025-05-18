require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
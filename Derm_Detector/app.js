const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS package
const authRoutes = require('./routes/auth.js');

const app = express();

// Middleware
app.use(cors({ 
  origin: ['http://127.0.0.1:5501', 'http://192.168.56.1:5501'] // Allow both origins
})); // Enable CORS for frontend running on port 5500
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Enable parsing JSON payloads

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/DDdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use(authRoutes);

// Serve static files (your login.html file)
// app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

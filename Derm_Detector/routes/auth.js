const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');


// Sign-up Route
router.post('/signup', async (req, res) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
          name: req.body.name,
          email: req.body.email,
          city: req.body.city,
          password: hashedPassword,
      });
      await user.save();
      res.json({ success: true, message: 'User registered successfully!', }); // Respond with JSON
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error registering new user.' }); // Return error in JSON format
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
      const user = await User.findOne({ email: req.body.email });
      if (user && await bcrypt.compare(req.body.password, user.password)) {
          res.json({ success: true, message: 'Login successful!' ,user: {
            id: user._id,
            name: user.name,
            email: user.email,
            city: user.city
        }}); // Respond with JSON
      } else {
          res.status(400).json({ success: false, message: 'Invalid email or password' }); // Return error in JSON format
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error logging in user' }); // Return error in JSON format
  }
});


module.exports = router;

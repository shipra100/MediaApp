const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.googleAuth = async (req, res) => {
  try {
    const { googleId, name, email } = req.body;

    // Validate request data
    if (!googleId || !name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user exists
    let user = await User.findOne({ googleId });
    if (!user) {
      // Create a new user
      user = await User.create({ googleId, name, email, mediaFiles: [] });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authention failed" });
  }
};

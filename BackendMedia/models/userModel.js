const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mediaFiles: [{ type: String }], // Array of media URLs
});

module.exports = mongoose.model('User', userSchema);

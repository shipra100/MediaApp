
const cloudinary = require('cloudinary').v2;
const User = require('../models/userModel');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload media to Cloudinary
exports.uploadMedia = async (req, res) => {
  try {
    // Check if a file is provided
    if (!req.file) {
      return res.status(400).json({ message: 'No media file uploaded' });
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: 'user_media', // Optional: You can organize media into folders
      resource_type: 'auto', // Automatically determine the media type (image, video, etc.)
    });

    // Get the media URL from Cloudinary's response
    const mediaUrl = uploadResponse.secure_url;

    // Fetch the user from the database
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Add the media URL to the user's mediaFiles array
    user.mediaFiles.push(mediaUrl);
    await user.save();

    // Respond with the updated list of media files
    res.status(200).json({ mediaFiles: user.mediaFiles });
  } catch (error) {
    console.error('Error uploading media:', error);
    res.status(500).json({ message: 'Media upload failed' });
  }
};

// Fetch media files from Cloudinary (URLs)
exports.getMedia = async (req, res) => {
  try {
    // Fetch the user from the database
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Respond with the list of media URLs
    res.status(200).json({ mediaFiles: user.mediaFiles });
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ message: 'Failed to fetch media' });
  }
};

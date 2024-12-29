const express = require('express');
const { uploadMedia, getMedia } = require('../controllers/mediaController');
const multer = require('multer'); // Import multer for file handling
const authMiddleware = require('../middlewares/authMiddleware'); // Your authentication middleware
// const { uploadMedia } = require('../controllers/mediaController'); // Your media controller

const router = express.Router();

// Set up multer storage configuration (You can adjust destination and filename)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
  }
});

// Initialize multer with the defined storage configuration
const upload = multer({ storage: storage });

// Define your route for media upload with auth and multer's single file upload
router.post('/upload', authMiddleware, upload.single('media'), uploadMedia);

router.get('/list', authMiddleware, getMedia);

module.exports = router;

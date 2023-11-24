// middleware/upload.js
const multer = require('multer');

const storageGallery = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req)
    cb(null, 'uploads/gallery');
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + '-' + file.originalname);
    cb(null, file.originalname);
  },
});

const gallery = multer({ storage: storageGallery, limits: { fileSize: 5 * 1024 * 1024 } })

module.exports = { gallery };




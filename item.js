// // routes/items.js
// const express = require('express');
// const router = express.Router();

// const Item  = require('./models/item.js');
// const upload = require('./middlewares/uploadImg.js')
// // Render form to upload cover or gallery images
// // router.get('/upload', async (req, res) => {
// //   res.render('upload');
// // });

// // Handle cover or gallery image upload
// router.post('/upload', upload.array('images', 5), async (req, res) => {
//   try {
//     const { type } = req.query; // Check the type query parameter

//     if (!type) {
//       return res.status(400).json({ error: 'Type parameter is required.' });
//     }

//     if (type === 'cover') {
//       const coverImage = req.files[0].filename;

//       // Save coverImage to the database or perform other actions as needed

//     } else if (type === 'gallery') {
//       const galleryImages = req.files.map(file => file.filename);

//       // Save galleryImages to the database or perform other actions as needed

//     } else {
//       return res.status(400).json({ error: 'Invalid type parameter.' });
//     }

//     res.redirect('/items');
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;

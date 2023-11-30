const express = require('express');
const router = express.Router();
const db = require('../../config/db.js');
const bodyParser = require("body-parser");
const { generateToken } = require("../../utils/jwt.js");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// Import model
const Item = require("../../models/item.js");
const User = require("../../models/user.js");
const Post = require("../../models/post.js");
const Image = require('../../models/image.js');

// Import middleware
const { titleChecker } = require("../../middlewares/titlechecker.js");
const { verifyToken } = require("../../middlewares/verifyToken.js");
const { gallery } = require("../../middlewares/uploadImg.js");

// Use bodyParser
router.use(bodyParser.json());

//create table
db.sync({ force: false})

// API Get Posts >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.get('/getposts',verifyToken,async(req,res)=>{
  try {
    // Fetch all posts from the database
    const posts = await Post.findAll();

    // Respond with the list of posts
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
})
// API Upload Imgs >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// router.get("/", (req, res) => {
//   res.render("upload");
// });
// router.post(
//   "/",
//   gallery.fields([
//     { name: "cover", maxCount: 1 },
//     { name: "gallery", maxCount: 5 },
//   ]),
//   async (req, res) => {
//     let savedDataArray = [];
//     if (req.files.gallery) {
//       // Handle both gallery and cover images
//       savedDataArray = req.files.gallery.map((file) => {
//         return {
//           destination: file.destination,
//           path: file.path,
//           filename: file.filename,
//           // itemId:file.text,
//           postId:1
//         };
//       });

//       const saveCover = req.files.cover.map((file) => {
//         return {
          
//           destination: file.destination,
//           path: file.path,
//           filename: file.filename,
//           // itemId:file.text,
//           postId:1
//         };
//       });
//       savedDataArray = savedDataArray.concat(saveCover);
//       // Assuming Item is your Sequelize model
//       const items = await Image.bulkCreate(savedDataArray);
//       res.render("uploaded", {
//         name: savedDataArray.map((file) => file.filename),
//       });
//     } else {
//       res.status(400).send("No files uploaded.");
//     }
//   }
// );






module.exports = router;


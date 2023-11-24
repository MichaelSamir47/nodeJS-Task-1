const express = require('express');
const router = express.Router();
const db = require('../config/db.js');
const bodyParser = require("body-parser");
const { generateToken } = require("../utils/jwt.js");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// Import model
const Item = require("../models/item.js");
const User = require("../models/user.js");
const Post = require("../models/post.js");
 const Image = require('../models/image.js');

// Import middleware
const { titleChecker } = require("../middlewares/titlechecker.js");
const { verifyToken } = require("../middlewares/verifyToken.js");
const { gallery } = require("../middlewares/uploadImg.js");

// Use bodyParser
router.use(bodyParser.json());

//create table
db.sync({ force: false})

// API login >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post('/login',async(req,res)=>{
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    // If the user and password are valid, you might generate a token here for authentication
    const token = generateToken(user);
    return res.status(200).json({  message: 'Login successful',token })
    // For simplicity, you can respond with a success message
  
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

})

// API Register >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post('/register',async(req,res)=>{
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      // Email already exists
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Respond with the newly created user
    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

})
// API Edit post >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.put('/post/:postId',verifyToken, async (req, res) => {
  const postId = req.params.postId;
  const updatedData = req.body; 

  // Assuming the updated data is sent in the request body
  try {
    // Find the post by ID
    const post = await Post.findByPk(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // Update the post with the new data
    await post.update(updatedData);
    // Respond with the updated post
    return res.status(200).json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
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
router.get("/", (req, res) => {
  res.render("upload");
});
router.post(
  "/upload",
  gallery.fields([
    { name: "cover", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  async (req, res) => {
    let savedDataArray = [];

    if (req.files.gallery) {
      // Handle both gallery and cover images
      savedDataArray = req.files.gallery.map((file) => {
        return {
          destination: file.destination,
          path: file.path,
          filename: file.filename,
          itemId:file.text
        };
      });

      const saveCover = req.files.cover.map((file) => {
        return {
          
          destination: file.destination,
          path: file.path,
          filename: file.filename,
          itemId:file.text,
        };
      });
      savedDataArray = savedDataArray.concat(saveCover);
      // Assuming Item is your Sequelize model
      const items = await Image.bulkCreate(savedDataArray);
 
      // console.log("Files uploaded successfully!");
      // console.log("Files details:", items);

      res.render("uploaded", {
        name: savedDataArray.map((file) => file.filename),
      });
    } else {
      res.status(400).send("No files uploaded.");
    }
  }
);






module.exports = router;


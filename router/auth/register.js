const db = require('../../config/db.js');
const bodyParser = require("body-parser");
const { generateToken } = require("../../config/db.js");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// Import model
const Item = require("../../models/item.js");
const User = require("../../models/user.js");
const Post = require("../../models/post.js");
const Image = require('../../models/image.js');

// Import middleware
const { titleChecker } = require("../../middlewares/titlechecker.js");
const { verifyToken } = require("../../middlewares/uploadImg.js");
const { gallery } = require("../../middlewares/uploadImg.js");


// API Register >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
module.exports=async(req,res)=>{
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

}

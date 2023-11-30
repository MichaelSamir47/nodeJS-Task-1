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


// API login >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
module.exports = async(req,res)=>{
  
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

}
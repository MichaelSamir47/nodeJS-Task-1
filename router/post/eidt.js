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

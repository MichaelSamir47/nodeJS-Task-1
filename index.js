const bodyParser = require('body-parser')
const express = require('express')
const app = express()
// const jwt = require('jsonwebtoken')
const { generateToken } = require('./utils/jwt');
const bcrypt = require("bcryptjs")
const{body,validationResult} = require("express-validator")
app.use(bodyParser.json())
//  log port
const port = 2020;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const Posts =require('./consts.js')
//middleware
const {titleChecker}   = require('./middlewares/titlechecker.js')
const { verifyToken } = require('./middlewares/verifyToken.js');

//mysql DataBase
const db = require('./config/db.js')
// Test database connection
db.authenticate()
  .then(() => {
    console.log("Database connected.....");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
  const User = require('./models/user.js');

  const Post = require('./models/post.js')
  //create table
  db.sync({ force: false})


// API login
app.post('/login',async(req,res)=>{
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


// API Register
app.post('/register',async(req,res)=>{
  // const errors =  validationResult(req)
  // if (!errors.isEmpty()){
  // return res.status(400).json({ errors: errors.array()})
  // }
  // let encryptPass = await bcrypt.hash(req.body.password,10) 
  // // return res.send(encryptPass)
  // const savedData = {...req.body,password:encryptPass}
  // const user= await User.create(savedData)
  // user?res.json({message:"Register has been succesfully"}):res.json("message:hadbeen")
  
  // const token = jwt.sign({id:newUser. _id, email: newUser. email},"test");
  // return res.send({
  //   success:true,
  //   msg:"Data Stored",
  //   // token:token,
  //   password:encryptPass,
  //   errors:errors
  // })


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



// API Create posts
app.post('/create',verifyToken,async(req,res)=>{
  const errors =  validationResult(req)
  if (!errors.isEmpty()){
  return res.status(400).json({ errors: errors.array()})
  }
  
  // return res.send(encryptPass)
  const savedData = req.body
  const post= await Post.create(savedData)
  post?res.json({message:"post has been succesfully"}):res.json("message: faild...")
})


// API Edit post
app.put('/post/:postId',verifyToken, async (req, res) => {
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




// API Delete post
app.delete('/post/:postId',verifyToken, async (req, res) => {
  const postId = req.params.postId;
  console.log(req.body)
  try {
    // Find the post by ID
    const post = await Post.findByPk(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete the post
    await post.destroy();

    // Respond with a success message
    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// API Get Posts
app.get('/getposts',verifyToken,async(req,res)=>{
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

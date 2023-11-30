const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { gallery } = require("./middlewares/uploadImg.js");
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', './views')

//  Set Port
const port = 2020;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));


// Include routes

const indexRoute = require('./router/post/index.js');
const auth = require('./router/auth/index.js');
const create = require('./router/post/create.js')

app.use('/', indexRoute);
app.use('/upload', indexRoute);
app.use('/auth', auth);
app.use('/create', create)
app.use('/createpost', create)

// app.use('/createpost',create)
// app.use('/', indexRoute);
// app.use('/auth', auth);
// app.use('/createpost', create)


// const Item = require("./models/item.js");
// const uploads = multer({ dest: './uploads/' });
//Api upload file EJS/
// app.get("/", (req, res) => {
//   res.render("upload");`
// });
// app.post('/upload',upload,async (req, res) => {

// res.render('uploaded',{name:req.file.filename})
// const savedData = {
//   destination:req.file.destination,
//   path:req.file.path,
//   filename:req.file.filename
// }
// const item = await Item.create(savedData)
// });
// res.send('Files uploaded successfully!');
// Route for handling file uploads
// app.post('/upload', gallery.array('file',5),cover.single('file'), async (req, res) => {
//   if (req.files && req.files.length > 0) {
//       const savedDataArray = req.files.map(file => {
//           return {
//               destination: file.destination,
//               path: file.path,
//               filename: file.filename
//           };
//       });

//   // Item Sequelize model
//       const items = await Item.bulkCreate(savedDataArray);

//       console.log('Files uploaded successfully!');
//       console.log('Files details:', items);

//       res.render('uploaded',{name:items.map(file=>{
//         return file.filename
//       })})
//   } else {
//       res.status(400).send('No files uploaded.');
//   }
// });

// app.post('/upload', gallery.array('files', 5), cover.single('file'), async (req, res) => {
//   let savedDataArray = [];

//   if (req.files && req.files.length > 0) {
//       // // Handle gallery images
//       if (req.files instanceof Array) {
//           savedDataArray = req.files.map(file => {
//               return {
//                   destination: file.destination,
//                   path: file.path,
//                   filename: file.filename
//               };
//           });
//       }
//       // Handle cover image
//       else if (req.file) {
//           savedDataArray.push({
//               destination: req.file.destination,
//               path: req.file.path,
//               filename: req.file.filename
//           });
//       }

//       // Assuming Item is your Sequelize model
//       const items = await Item.bulkCreate(savedDataArray);

//       console.log('Files uploaded successfully!');
//       console.log('Files details:', items);
//       res.render('uploaded', {
//           name: savedDataArray.map(file => file.filename)
//       });

//   } else {
//       res.status(400).send('No files uploaded.');
//   }
// });
// app.post(
//   "/upload",
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
//         };
//       });

//       const saveCover = req.files.cover.map((file) => {
//         return {
//           destination: file.destination,
//           path: file.path,
//           filename: file.filename,
//         };
//       });
//       savedDataArray = savedDataArray.concat(saveCover);
//       console.log(saveCover, savedDataArray);

//       // Assuming Item is your Sequelize model
//       const items = await Item.bulkCreate(savedDataArray);

//       console.log("Files uploaded successfully!");
//       console.log("Files details:", items);

//       res.render("uploaded", {
//         name: savedDataArray.map((file) => file.filename),
//       });
//     } else {
//       res.status(400).send("No files uploaded.");
//     }
//   }
// );

// // API login
// app.post('/login',async(req,res)=>{
//   const { email, password } = req.body;
//   try {
//     // Find the user by email
//     const user = await User.findOne({ where: { email } });

//     // Check if the user exists
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if the password is correct
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     // If the user and password are valid, you might generate a token here for authentication
//     const token = generateToken(user);
//     return res.status(200).json({  message: 'Login successful',token })
//     // For simplicity, you can respond with a success message

//   } catch (error) {
//     console.error('Login error:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }

// })

// // API Register
// app.post('/register',async(req,res)=>{
//   // const errors =  validationResult(req)
//   // if (!errors.isEmpty()){
//   // return res.status(400).json({ errors: errors.array()})
//   // }
//   // let encryptPass = await bcrypt.hash(req.body.password,10)
//   // // return res.send(encryptPass)
//   // const savedData = {...req.body,password:encryptPass}
//   // const user= await User.create(savedData)
//   // user?res.json({message:"Register has been succesfully"}):res.json("message:hadbeen")

//   // const token = jwt.sign({id:newUser. _id, email: newUser. email},"test");
//   // return res.send({
//   //   success:true,
//   //   msg:"Data Stored",
//   //   // token:token,
//   //   password:encryptPass,
//   //   errors:errors
//   // })

//   const { username, email, password } = req.body;

//   try {
//     // Check if the email already exists
//     const existingUser = await User.findOne({ where: { email } });

//     if (existingUser) {
//       // Email already exists
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     // Hash the password before saving it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user in the database
//     const newUser = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     // Respond with the newly created user
//     return res.status(201).json(newUser);
//   } catch (error) {
//     console.error('Error registering user:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }

// })

// // API Create posts
// router.get("/create", (req, res) => {
//   res.render("upload");
// });
// app.post('/create',verifyToken,async(req,res)=>{
//   const errors =  validationResult(req)
//   if (!errors.isEmpty()){
//   return res.status(400).json({ errors: errors.array()})
//   }

//   // return res.send(encryptPass)
//   const savedData = req.body
//   const post= await Post.create(savedData)
//   post?res.json({message:"post has been succesfully"}):res.json("message: faild...")
// })

// API Edit post
// app.put('/post/:postId',verifyToken, async (req, res) => {
//   const postId = req.params.postId;
//   const updatedData = req.body;

//   // Assuming the updated data is sent in the request body
//   try {
//     // Find the post by ID
//     const post = await Post.findByPk(postId);

//     // Check if the post exists
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     // Update the post with the new data
//     await post.update(updatedData);

//     // Respond with the updated post
//     return res.status(200).json(post);
//   } catch (error) {
//     console.error('Error updating post:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // API Get Posts
// app.get('/getposts',verifyToken,async(req,res)=>{
//   try {
//     // Fetch all posts from the database
//     const posts = await Post.findAll();

//     // Respond with the list of posts
//     return res.status(200).json(posts);
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// })

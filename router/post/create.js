
// API Create post >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



const {validationResult } = require("express-validator");
const express = require('express');
const router = express.Router();
const Post = require("../../models/post.js");
const Image = require('../../models/image.js');

const { gallery } = require("../../middlewares/uploadImg.js");

  router.get("/", (req, res) => {
    res.render("addpost");
  });

  router.post('/',gallery.fields([
    { name: "cover", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]), async (req, res) => {
  const errors =  validationResult(req)
  if (!errors.isEmpty()){
  return res.status(400).json({ errors: errors.array()})
  }

  // return res.send(encryptPass)
  const savedData = req.body
  const post = await Post.create(savedData)
  // post?res.json({message:"post has been succesfully"}):res.json("message: faild...")
  if (req.files.gallery) {
    // Handle both gallery and cover images
    savedDataArray = req.files.gallery.map((file) => {
      return {
        destination: file.destination,
        path: file.path,
        filename: file.filename,
        // itemId:file.text,
        postId:post.id
      };
    });

    const saveCover = req.files.cover.map((file) => {
      return {
        
        destination: file.destination,
        path: file.path,
        filename: file.filename,
        // itemId:file.text,
        postId:post.id
      };
    });
    savedDataArray = savedDataArray.concat(saveCover);
    // Assuming Item is your Sequelize model
    const items = await Image.bulkCreate(savedDataArray);
    res.render("uploaded", {
      name: savedDataArray.map((file) => file.filename),
    });
  } else {
    res.status(400).send("No files uploaded.");
  }

  res.render("done")
})


// router.post('/',async(req,res)=>{

//   const errors =  validationResult(req)
//   if (!errors.isEmpty()){
//   return res.status(400).json({ errors: errors.array()})
//   }

//   // return res.send(encryptPass)
//   const savedData = req.body
//   const post= await Post.create(savedData)
//   // post?res.json({message:"post has been succesfully"}):res.json("message: faild...")
//   res.render("done")
// })
module.exports = router; 

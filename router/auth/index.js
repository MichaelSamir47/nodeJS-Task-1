const registerRoutes = require("./register")
const {login,register} = require("../../controllers/authController")
const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.post("/register",register)
router.post("/login",login)


module.exports = router


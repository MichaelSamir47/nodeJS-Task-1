// User Model
// const db = require('../config/db.js')
// const Sequelize = require('sequelize');
// //User Model
// const User = db.define('user-info',{
//     id:{
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name:{
//       type:Sequelize.STRING
//     },
//     email:{
//       type:Sequelize.INET
//     },
//     password:{
//       type:Sequelize.STRING
//     },
// });
// module.exports = User;
// models/user.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const User = sequelize.define('User', {
  // Columns
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add more columns as needed
});

module.exports = User;

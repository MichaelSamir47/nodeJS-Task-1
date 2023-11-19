// models/Item.js
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../config/db'); 


  // const Item = sequelize.define('Item', {
  //     id: {
  //   type: DataTypes.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true,
  //   allowNull: false,
  // },
  //   title: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   coverImage: {
  //     type: DataTypes.STRING, // You can use DataTypes.BLOB for binary data
  //   },
  //   galleryImages: {
  //     type: DataTypes.ARRAY(DataTypes.STRING), // Store an array of image URLs
  //   },
  // });

  const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Make sure to set up your database connection

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // You may add more fields as needed
});

module.exports = Item
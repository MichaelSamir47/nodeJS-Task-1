// Post Model
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../config/db'); 
// const Image = require('./image');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Image = require('./image');
const Post = sequelize.define('Post', {
  // Columns
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  
});

Post.hasMany(Image, { as: 'images', foreignKey: 'postId' });

module.exports = Post;

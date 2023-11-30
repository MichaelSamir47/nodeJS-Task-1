// models/image.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Post   = require('./post'); // Ensure the correct path to the Item model

const Image = sequelize.define('Image', {
  // Other columns...
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
  postId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false,
    
  },
});


Image.associate = (models)=>{
  Image.belongsTo(models.Post, { foreignKey: 'postId', onDelete: 'CASCADE' });
}
// Define the association with the Post model
// Image.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE' });

// Make sure Item is a Sequelize model instance
// if (Item && Item.prototype && Item.prototype instanceof sequelize.Sequelize.Model) {
  // Image.belongsTo(Post, { as: 'post', foreignKey: 'imageId' });
// } else {
//   console.error('Error: Item is not a valid Sequelize model.');
// }

module.exports = Image;

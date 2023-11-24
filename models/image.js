// models/image.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Item = require('./item'); // Ensure the correct path to the Item model

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
});

// Make sure Item is a Sequelize model instance
if (Item && Item.prototype && Item.prototype instanceof sequelize.Sequelize.Model) {
  Image.belongsTo(Item, { as: 'item', foreignKey: 'itemId' });
} else {
  console.error('Error: Item is not a valid Sequelize model.');
}

module.exports = Image;

// models/item.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
//const Image = require('./image');

const Item = sequelize.define('Item', {
  // ... other attributes
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
  
// Item.hasMany(Image, { as: 'images', foreignKey: 'itemId' }); // Define the one-to-many association

module.exports = Item;
// Post Model
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const POST = sequelize.define('POST', {
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
    type: DataTypes.STRING(100),
    allowNull: false,

  },
  
});

module.exports = POST;
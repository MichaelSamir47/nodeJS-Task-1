const Sequelize = require('sequelize');
module.exports = new Sequelize('task-db','root','', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
  // operatorsAliases: false,
  dialectOptions: {
    connectTimeout: 60000, // Set the timeout to 60 seconds or adjust as needed
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});


// get local Ip 
 //ipconfig getifaddr en0

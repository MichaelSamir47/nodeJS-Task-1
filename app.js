const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', './views')

//  Set Port
const port = 2020;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Include routes
const indexRoute = require('./router/index.js');
app.use('/', indexRoute);
  





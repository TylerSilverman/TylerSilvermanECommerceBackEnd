const path = require('path');
const express = require('express');
const routes = require('./routes');
require('./config/connection');

//to write something in the console terminal and make it a table.
var consoleTable = require('console-table');
consoleTable([
  ["WELCOME TO ECOMMERCE BACK END, PLEASE NAVIGATE TO POSTMAN TO TEST THE DIFFERENT API ROUTES"]
])

const app = express();
const PORT = process.env.PORT || 3001;

// import sequelize connection
const sequelize = require('./config/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//turning on function for routes
app.use(routes);

// app listening to the local host
// sync sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening http://localhost:'+ PORT));
});

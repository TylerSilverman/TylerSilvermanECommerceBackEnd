const path = require('path');
const express = require('express');
const routes = require('./routes');
require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// import sequelize connection
const sequelize = require('./config/connection');

//created for handleBars
// const hbs = exphbs.create({});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//turning on function for routes
app.use(routes);

// app listening to the local host
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

// sync sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
// DEPENDENCIES
const express = require('express'); //Go to node module grab everything in express and assign to it "express" variables and it will have alll of the express functionality 
const app = express(); //activate express framework (by creating app and assigning the value by invoking the express variable)
const artSeed = require('./models/artSeed.js');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();
const artsController = require('./controllers/arts');

// DATABASE CONFIGURATION
const db = mongoose.connection;

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// DATABASE CONNECTION ERROR/SUCCESS
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// MOUNT MIDDLEWARE & BODY PARSER
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

// CONTROLLER MIDDLEWARE
app.use('/arts', artsController);

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Andre is listening to, ${PORT}`));
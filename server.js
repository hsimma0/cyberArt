// DEPENDENCIES
const express = require('express'); //Go to node module grab everything in express and assign to it "express" variables and it will have alll of the express functionality 
const mongoose = require('mongoose');
const app = express(); //activate express framework (by creating app and assigning the value by invoking the express variable)
const PORT = 3030;
const Art = require('./models/art.js');


// DATABASE CONFIGURATION
const DATABASE_URL="mongodb+srv://admin:abcd1234@cyberart.y8dna.mongodb.net/art?retryWrites=true&w=majority";
const db = mongoose.connection;

// DATABASE CONNECTION
mongoose.connect(DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// DATABASE CONNECTION ERROR/SUCCESS
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// MOUNT MIDDLEWARE & BODY PARSER
app.use(express.urlencoded({ extended:false}));

// ROUTES (FULL CRUD)
// app.get('/', function (req,res){
//     res.send('Andre is listening to the World')
// })

// INDEX
app.get('/arts',(req, res) => {
    Art.find({}, (error, foundArt) => {
        res.send(foundArt)
    });
});

// NEW


// DELETE
app.delete('/arts/:id', (req, res) => {
    Art.findByIdAndDelete(req.params.id, (error, deletedArt) => {
        res.send({ success: true});
    });
});


// UPDATE
app.put('/arts/:id', (req, res) => {
    Art.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true},
        (error, updatedArt) => {
            res.send(updatedArt);
        }
    );
});


// CREATE
app.post('/arts', (req, res) => {
    Art.create(req.body, (error, createdArt) => {
        res.send(createdArt)
    });
});


// EDIT

// SHOW
app.get('/arts/:id', (req, res) => {
    Art.findById(req.params.id, (error, foundArt) => {
        res.send(foundArt)
    });
});

// LISTENER
app.listen( PORT, function(){
    console.log("Andre is listening to", PORT)
})
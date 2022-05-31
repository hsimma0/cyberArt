// DEPENDENCIES
const express = require('express'); //Go to node module grab everything in express and assign to it "express" variables and it will have alll of the express functionality 
const mongoose = require('mongoose');
const app = express(); //activate express framework (by creating app and assigning the value by invoking the express variable)
const PORT = 3030;
const Art = require('./models/art.js');
const methodOverride = require('method-override');


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
app.use(methodOverride('_method'));

// ROUTES (FULL CRUD)
// app.get('/', function (req,res){
//     res.send('Andre is listening to the World')
// })

// INDEX
app.get('/arts',(req, res) => {
    Art.find({}, (error, foundArt) => {
        res.render('index.ejs', {
            Art: foundArt,
        });
    });
});

// NEW
app.get('/arts/new', (req, res) => {
    res.render('new.ejs')
})

// DELETE
app.delete('/arts/:id', (req, res) => {
    Art.findByIdAndDelete(req.params.id, (error, deletedArt) => {
        res.redirect('/arts');
    });
});


// UPDATE
app.put('/arts/:id', (req, res) => {
    if (req.body.updatedArt === 'on'){
        req.body.updatedArt = true
    } else {
        req.body.updatedArt = false
    }
    arts[req.params.id] = req.body
    res.redirect('arts')
});
    
//     Art.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true},
//         (error, updatedArt) => {
//             res.send(updatedArt);
//         }
//     );
// });


// CREATE (POST)
app.post('/arts', (req, res) => {
    
    if(req.body.completed === 'on'){
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }

    Art.create(req.body, (error, createdArt) => {
        res.redirect('/arts');
    });
});


// EDIT
app.get('/arts/:id/edit', (req,res) => {
    res.render('edit.ejs', {
        art: arts[req.params.id],
        index: req.params.id,
    })
})

// SHOW
app.get('/arts/:id', (req, res) => {
    Art.findById(req.params.id, (error, foundArt) => {
        res.render('show.ejs')
    });
});

// LISTENER
app.listen( PORT, function(){
    console.log("Andre is listening to", PORT)
})
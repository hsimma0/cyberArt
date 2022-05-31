// DEPENDENCIES
const express = require('express'); //Go to node module grab everything in express and assign to it "express" variables and it will have alll of the express functionality 
const Art = require('./models/art.js');
const mongoose = require('mongoose');
const app = express(); //activate express framework (by creating app and assigning the value by invoking the express variable)
const methodOverride = require('method-override');
require('dotenv').config();


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

// ROUTES (FULL CRUD)
app.get('/seed', (req, res) => {
    Art.deleteMany({}, (error, allArts) => {});
    Art.create(artSeed, (error, data) => {
        res.redirect('arts');
    });
});
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
app.put("/arts/:id", (req, res) => {
    Art.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedArt) => {
        res.redirect(`/arts/${req.params.id}`)
      }
    )
  });
    
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
    Art.findById(req.params.id, (error, foundArt) => {
        res.render('edit.ejs', {
            Art: foundArt,
        })
    })
})

// SHOW
app.get('/arts/:id', (req, res) => {
    Art.findById(req.params.id, (error, foundArt) => {
        res.render('show.ejs', {
            art: foundArt,
        });
    });
});

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Andre is listening to, ${PORT}`));
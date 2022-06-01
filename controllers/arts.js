// DEPENDENCIES
const express = require('express');
const Art = require ('../models/art');

// INITIALIZE THE ROUTER OBJECT
const router = express.Router();

// DEFINE ROUTER/CONTROLLER CODE

// ROUTES (FULL CRUD)
const artSeed = require('../models/artSeed.js');
router.get('/seed', (req, res) => {
    Art.deleteMany({}, (error, allArts) => {});
    Art.create(artSeed, (error, data) => {
        res.redirect('arts');
    });
});
// INDEX
router.get('/',(req, res) => {
    Art.find({}, (error, foundArt) => {
        res.render('index.ejs', {
            Art: foundArt,
        });
    });
});

// NEW
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

// DELETE
router.delete('/:id', (req, res) => {
    Art.findByIdAndDelete(req.params.id, (error, deletedArt) => {
        res.redirect('/arts');
    });
});


// UPDATE
router.put("/:id", (req, res) => {
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
router.post('/', (req, res) => {
    
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
router.get('/:id/edit', (req,res) => {
    Art.findById(req.params.id, (error, foundArt) => {
        res.render('edit.ejs', {
            Art: foundArt,
        })
    })
})

// SHOW
router.get('/:id', (req, res) => {
    Art.findById(req.params.id, (error, foundArt) => {
        res.render('show.ejs', {
            Art: foundArt,
        });
    });
});

//BUY
router.post('/:id/buy',(req, res) => {
    Art.findById(req.params.id, (err, boughtArt) => {
        if(boughtArt.Quantity) {
            boughtArt.Quantity--
            boughtArt.save(() => {
    res.redirect(`/arts/${boughtArt._id}`);
            });
        } else {
    res.redirect(`/arts/${boughtArt._id}`);
        }
    });
});

// MODULE EXPORT
module.exports = router;
// DEPENDENCIES
const express = require('express'); //Go to node module grab everything in express and assign to it "express" variables and it will have alll of the express functionality 
const app = express(); //activate express framework (by creating app and assigning the value by invoking the express variable)
const PORT = 3030;

// DATABASE CONNECTION ERROR/SUCCESS


// DEFINE CALLBACK FUNCTIONS FOR VARIOUS EVENTD


// MOUNT MIDDLEWARE & BODY PARSER


// ROUTES (FULL CRUD)
// app.get('/', function (req,res){
//     res.send('Andre is listening to the World')
// })
// INDEX
app.get('/',(req, res) => {
    res.render('index.ejs')
})
// NEW

// EDIT

// SHOW

// LISTENER
app.listen( PORT, function(){
    console.log("Andre is listening to", PORT)
})
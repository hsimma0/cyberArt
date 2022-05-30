const mongoose = require('mongoose');
const artSchema = new mongoose.Schema({
    Name: {type: String, required:true },
    Description: {type: String, required: true },
    Rarity: {type: String, required: true },
    Image: {type: String, required: true },
    Price: { type: Number, required: true },
    Quantity: { type: Number, default:0},
});

const Art = mongoose.model('Art', artSchema);
module.exports = Art;
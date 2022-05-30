const mongoose = require('mongoose');
const artSchema = new mongoose.Schema({
    name: {type: String, required:true },
    description: {type: String, required: true },
    img: {type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, default:0},
});

const Art = mongoose.model('Art', artSchema);
module.exports = Art;
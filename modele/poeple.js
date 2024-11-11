
const mongoose = require('mongoose');
const validator = require('validator');
const poepleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 0
    },

    favoriteFoods: {
        type: [String]
    },

});

const poeple = mongoose.model('poeple',poepleSchema);

module.exports = poeple;
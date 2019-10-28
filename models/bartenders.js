const mongoose = require('mongoose');

const bartenderSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    photoURL: String,
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
});

const Bartender = mongoose.model('bartender', bartenderSchema);

module.exports= Bartender
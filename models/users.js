const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    photoURL: String,
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports= User
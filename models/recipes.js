const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    drinkName: String,
    ingredients: [String],
    photo: String
});

const Photo = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe
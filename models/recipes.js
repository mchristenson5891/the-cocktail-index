const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    drinkName: String,
    ingredients: [String],
    photo: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe
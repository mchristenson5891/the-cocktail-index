const express = require('express');
const router = express.Router();
const Bartender = require('../models/bartenders');
const Recipe = require('../models/recipes');

const isLoggedIn = (req, res, next) => {
    console.log(req.session)
    if(req.session.userId) {
        next()
    } else {
        res.redirect('/login')
    }
    
}
//index route
router.get('/', async (req,res)=>{
    try{
        const allRecipes = await Recipe.find({})
        console.log(allRecipes)
        res.render('recipes/index.ejs', {
            recipes: allRecipes
        })
    }catch(err){
        console.log(err)
    }

});

//new route add is logged in
router.get('/new', async (req, res)=>{

    try{
        const allBartenders = await Bartender.find({})
        res.render('recipes/new.ejs', {
            bartenders: allBartenders
        })
    }catch(err){
        console.log(err)
    }
});

router.post('/', async (req, res)=>{
    console.log(req.body)
    try{
        const createdRecipe = await Recipe.create(req.body)
        const foundBartender = await Bartender.findById(req.session.userId || "5db865585a923c0d6fe4b50a")
            foundBartender.recipes.push(createdRecipe);
            foundBartender.save()
            console.log(foundBartender)
        res.redirect('/recipes')

    }catch(err){
        console.log(err)
    }
});

//show route
router.get('/:id', async(req, res)=>{

    try{
        const foundBartender = await Bartender.findOne({'recipes': req.params.id})
        .populate({path: 'recipes', match: {_id: req.params.id}})
        console.log(foundBartender)
        res.render('recipes/show.ejs', {
            bartender: foundBartender,
            recipe: foundBartender.recipes[0]
        })

    }catch(err){
        console.log(err)

    }
})


module.exports = router;
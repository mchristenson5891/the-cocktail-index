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
router.get('/new', isLoggedIn, async (req, res)=>{

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
        console.log(foundBartender, 'this is bartender')
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
        const foundBartender = await Bartender.findOne({'recipes': req.params.id}).populate('recipes')
        const foundRecipe = await Recipe.findById(req.params.id)
        res.render('recipes/show.ejs', {
            bartender: foundBartender,
            recipe: foundRecipe
        })
        console.log(foundBartender,'<===++++++++++=======found bt');

    }catch(err){
        console.log(err)

    }
});

//edit route
router.get('/:id/edit', async(req, res)=>{

    try{
        const foundRecipe = await Recipe.findById(req.params.id)
        res.render('recipes/edit.ejs', {
            recipe: foundRecipe
        })

    }catch(err){
        console.log(err)

    }
});

router.put('/:id', async(req, res)=>{

    try{
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body)
        console.log(updatedRecipe)
        res.redirect('/recipes')
    }catch(err){
        console.log(err)
    }
});

delete
router.delete('/:id', async (req, res)=>{
    try{
        const foundRecipe = await Recipe.findByIdAndRemove(req.params.id)
        const foundBartender = await Bartender.findOne({'recipes': req.params.id})
        foundBartender.recipes.remove(req.params.id)
        foundBartender.save((err, updatedUser)=>{
            console.log(updatedUser, '=========this updated user')
            res.redirect('/recipes')
        })

    }catch(err){
        console.log(err)
    }
})


module.exports = router;
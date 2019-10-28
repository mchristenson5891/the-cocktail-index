const express = require('express')
const router = express.Router();
const Bartender = require('../models/bartenders');
const Recipe = require('../models/recipes');


//index
router.get('/', async (req, res) => {

    try{
        const allBartenders = await Bartender.find({})
        console.log(allBartenders)
        res.render('bartenders/index.ejs',{
            bartenders: allBartenders
        })
        
    }catch(err){
        res.send(err)
    }
})

//new route
router.get('/new', (req, res )=>{
    console.log(req.body, 'this is the route')
    res.render('bartenders/new.ejs');
})

//create user profile
router.post('/', async (req, res)=>{

    try{
        const createdBartender = await Bartender.create(req.body);
        console.log(createdBartender)
        res.redirect('/bartenders')
    }catch(err){
        res.send(err)
    }
})

module.exports = router;
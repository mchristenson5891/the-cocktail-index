const express = require('express')
const router = express.Router();
const Bartender = require('../models/bartenders');
const Recipe = require('../models/recipes');
const bcrypt = require('bcryptjs')

//login
router.post('/login', async(req, res)=>{

    try{
      const foundBartender = await Bartender.findOne({username: req.body.username})
      if(foundBartender ){
        if(bcrypt.compareSync(req.body.password, foundBartender .password)){
          req.session.message ='Logged out.';
          req.setEncoding.username = foundBartender.username;
          req.session.logged = true;
          res.redirect('/bartenders')
        }else{
          req.session.message = 'Username or password is incorrect'
          res.redirect('/');
        }
      }else {
        req.session.message = 'Username or password is incorrect'
        res.redirect('/'); 
      }
    } catch (err){
      res.send(err)
  
    }
  
});

//logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err);
    } else {
      res.redirect('/');
    }
  })

});

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
// router.get('/new', (req, res )=>{
//     console.log(req.body, 'this is the route')
//     res.render('bartenders/new.ejs');
// })

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

//show route
router.get('/:id', async (req, res)=>{

  try{
    const foundBartender = await Bartender.findById(req.params.id)
    console.log(req.params.id, 'hitting show route')
    res.render('bartenders/show.ejs',{
      bartender: foundBartender
    })

  }catch(err){
    res.send(err)
  }
});

//edit
router.get('/:id/edit', async(req, res)=>{

  try{
    const foundBartender = await Bartender.findById(req.params.id)
    console.log(foundBartender, 'hitting edit route')
    res.render('bartenders/edit.ejs',{
      bartender: foundBartender
    })
    
  }catch(err){
    res.send(err)
  }
});


//register
router.post('/register', async (req, res) => {

  try{
    const foundBartender = await Bartender.findOne({username: req.body.username})
    console.log(foundBartender, 'this is bartender')
    if(foundBartender){
      res.send('Username already exists')
    }
    else{
      const password = req.body.password;
      const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      req.body.password = passwordHash
      
      const createdBartender = await Bartender.create(req.body);
      console.log(createdBartender)
      req.session.username = createdBartender.username;
      req.session.logged = true;
    
      res.redirect('/bartenders')
    }

  }catch(err){
    res.send(err)
  }

});


module.exports = router;
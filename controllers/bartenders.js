const express = require('express')
const router = express.Router();
const Bartender = require('../models/bartenders');
const Recipe = require('../models/recipes');
const bcrypt = require('bcryptjs')

//login
router.post('/login', async(req, res)=>{

    try{
      const foundBartender = await Bartender.findOne({username: req.body.username})
      if(foundBartender){
        if(bcrypt.compareSync(req.body.password, foundBartender.password)){
          req.session.message ='Logged out.'; ///maybe take out
          req.session.username = foundBartender.username;
          req.session.userId = foundBartender._id
          req.session.logged = true;
          res.redirect(`/bartenders/${foundBartender._id}`)
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
        res.render('bartenders/index.ejs',{
            bartenders: allBartenders
        })
        
    }catch(err){
        res.send(err)
    }
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

//show route
router.get('/:id', async (req, res)=>{

  try{
    const foundBartender = await Bartender.findById(req.params.id)
    const foundRecipes = await Bartender.findById(req.params.id).populate('recipes')
    const isLogged = req.session.userId
    const bartenderId = req.params.id
    
    res.render('bartenders/show.ejs',{
      bartender: foundBartender,
      recipes: foundRecipes,
      isLogged: isLogged,
      bartenderId: bartenderId
    })

  }catch(err){
    console.log(err)
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

router.put('/:id', async (req, res)=>{

  try{

    const updatedBartender = await Bartender.findByIdAndUpdate(req.params.id, req.body).populate({path:'recipes'})
    console.log(updatedBartender)
    res.redirect('/bartenders')

  }catch(err){
    res.send(err)
  }
})

//delete

router.delete('/:id', async (req, res)=>{

  try{
    const deletedBartender = await Bartender.findByIdAndRemove(req.params.id)
    await Recipe.remove({_id: {$in: deletedBartender.recipes}})
    console.log(deletedBartender, 'deleting the bartender')
    res.redirect('/bartenders')

  }catch(err){
    console.log(err)
  }
})


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
      req.session.userId = createdBartender._id
      req.session.logged = true;
    
      res.redirect(`/bartenders/${createdBartender._id}`)
    }

  }catch(err){
    res.send(err)
  }

});


module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/bartenders');
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {

  const password = req.body.password; // the password from the form
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const userDbEntry = {};
  
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;
  userDbEntry.email    = req.body.email;

  const createdUser = await User.create(userDbEntry);
  console.log(createdUser)
  req.session.username = createdUser.username;
  req.session.logged = true;

  res.redirect('/bartenders')

})


router.post('/login', async(req, res)=>{

    try{
      const foundUser = await User.findOne({username: req.body.username})
      if(foundUser){
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
          req.session.message ='';
          req.setEncoding.username = foundUser.username;
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




module.exports = router;

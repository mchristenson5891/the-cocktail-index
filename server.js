const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session')

require('./db/db');

//sessions
app.use(session({
    secret: 'this is a secret string',
    resave: false,
    saveUnintialized: false,
}));

//styles
app.use(express.static('public'));

//middelware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//controllers

const usersController = require('./controllers/users.js');
app.use('/users', usersController)

const recipesController = require('./controllers/recipes.js');
app.use('/recipes', recipesController)

const loginsController = require('./controllers/logins.js');
app.use('/auth', loginsController)


//homepage
app.use('/', (req, res)=>{
    res.render('index.ejs')

});

//login
app.post('/:login', (req, res)=>{
    res.redirect('login.ejs')
});

app.listen(3000, ()=>{
    console.log(3000, 'listening')
});
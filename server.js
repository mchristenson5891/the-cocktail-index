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

const bartendersController = require('./controllers/bartenders.js');
app.use('/bartenders', bartendersController)

const recipesController = require('./controllers/recipes.js');
app.use('/recipes', recipesController)

const usersController = require('./controllers/users.js');
app.use('/auth', usersController)


//homepage
app.get('/', (req, res)=>{
    console.log(req.session, 'home route')
    res.render('index.ejs',{
        message: req.session.message,
    })

});

app.get('/register', (req, res)=>{
    res.render('register/register.ejs')
});

app.get('/login', (req, res)=>{
    res.render('login.ejs')
});

app.listen(3000, ()=>{
    console.log(3000, 'listening')
});
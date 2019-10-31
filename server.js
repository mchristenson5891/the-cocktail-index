const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session')
const bartendersController = require('./controllers/bartenders.js');
const recipesController = require('./controllers/recipes.js');

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

//use
app.use('/bartenders', bartendersController)
app.use('/recipes', recipesController)

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
    console.log(req.session)
    res.render('login/login.ejs')
});

app.listen(3000, ()=>{
    console.log(3000, 'listening')
});
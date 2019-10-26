const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// const session = require('express-sessions')

require('./db/db');

//sessions
// app.use(session({
//     secret: 'this is a secret string',
//     resave: false,
//     saveUnintialized: false
// }));

//middelware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.listen(3000, ()=>{
    console.log(3000, 'listening')
});
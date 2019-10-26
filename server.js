const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//middelware
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.listen(3000, ()=>{
    console.log(3000, 'listening')
})
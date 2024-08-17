const express = require('express');
const app =express();
const db = require('./db')

require('dotenv').config(); //requir dotenv file for sensitive information config

const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //req.body

// Middleware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); // Move to the next middleware function
}

// Apply middleware to all routes
app.use(logRequest);

app.get('/', function (req, res){
    res.send('Hi welcome to my hotel.... how can i help you?, we have list of menus')
})


//import the router files
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu', menuItemRoutes);


app.listen(3000, ()=>{
    console.log('listening on port 3000');
})


//comment add for testing purpose
//git pull

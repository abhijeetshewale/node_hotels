const express = require('express');
const app =express();
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //req.body




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


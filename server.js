const express = require('express');
const app = express();

const db = require('./db');

const bodyParser = require('body-parser')
app.use(bodyParser.json()); // req body 

app.get('/', function (req, res) {
   res.send('Welcome to my hotels ');
})



//.....used router middleware for avoide this......... 



//... Import the router files...
const personRoutes = require('./routes/person.routes.js');
const menuRoutes = require('./routes/menu.routes.js');
// Use the routes 
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(3000, () => {
   console.log('listening on port 3000');
})
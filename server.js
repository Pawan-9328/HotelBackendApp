const express = require('express');
const app = express();
require('dotenv').config();

const passport = require('./auth.js');

const db = require('./db');
const bodyParser = require('body-parser')
app.use(bodyParser.json()); // req body  
const PORT = process.env.PORT || 3000;

//...Middleware Function.......

const longRequest = (req, res, next) => {
   console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.original}`);
   next() // Move on to the next phase...

}

app.use(longRequest)

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', { session: false });

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


app.listen(PORT, () => {
   console.log('listening on port 3000');
})
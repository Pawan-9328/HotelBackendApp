const express = require('express');
const app = express();

const db = require('./db');
const Person = require("./models/person.models.js");

app.get('/', function (req, res) {
   res.send('Welcome to my hotels ');
})


app.listen(3000, () => {
   console.log('listening on port 3000');
})
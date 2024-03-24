const express = require('express');
const app = express();

const db = require('./db');

const bodyParser = require('body-parser')
app.use(bodyParser.json()); // req body 
const Person = require("./models/person.models.js");
const MenuItem = require('./models/menu.models.js');

app.get('/', function (req, res) {
   res.send('Welcome to my hotels ');
})

//POST route to add a person 
app.post('/person', async (req, res) => {
   try {
      const data = req.body; // Assuming the request body contains the person data 

      // Create a new person document using the mongoose model 
      const newPerson = new Person(data);

      //else.
      // newPerson.name = data.name;
      // newPerson.age = data.age;
      // newPerson.mobile = data.mobile;
      // newPerson.email = data.email;
      // newPerson.address = data.address;

      //save the new person to the database
      const response = await newPerson.save()
      console.log('Data saved');
      res.status(200)
         .json(response);

   } catch (error) {
      console.log(error);
      res.status(500)
         .json({ error: 'Internal Server Error' });
   }

})

// Get method to get the person 
app.get('/person', async (req, res) => {
   try {
      const data = Person.find();
      console.log('Data Fetched');
      res
         .status(200)
         .json(data);

   } catch (error) {
      console.log(error);
      res.status(500)
         .json({ error: 'Internal Server Error' });
   }
})

app.post('/menu', async (req, res) => {
   try {
      const menu = req.body;
      const newMenu = new MenuItem(menu);

      const response = await newMenu.save();
      console.log('Menu data saved');
      res
         .status(200)
         .json(response)

   } catch (error) {
      console.log(error);
      res.status(500)
         .json({ error: 'Internal Server Error' });
   }
})


app.get('/menu', async (req, res) => {
   try {
      const data = MenuItem.find();
      console.log('Data Fetche');
      res
         .status(200)
         .json(data);
   } catch (error) {
      console.log(error);
      res.status(500)
         .json({ error: 'Internal Server Error ' })
   }
})




app.listen(3000, () => {
   console.log('listening on port 3000');
})
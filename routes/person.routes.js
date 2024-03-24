const express = require('express');
const router = express.Router();
const Person = require('../models/person.models.js');


//POST route to add a person 
router.post('/', async (req, res) => {
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

router.get('/', async (req, res) => {
   try {
      const data = await Person.find().lean();
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

router.get('/:workType', async (req, res) => {
   try {
      // workType = parameters 
      const workType = req.params.workType; // Extract the work type from the URL parameter
      if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
         const response = await Person.find({ work: workType });
         console.log('response fetched');
         res.status(200).json(response);

      } else {
         res.status(404).json({ error: 'Invalid work type' });
      }

   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error ' })
   }
})

module.exports = router;

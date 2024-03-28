const express = require('express');
const router = express.Router();
const Person = require('../models/person.models.js');
const { jwtAuthMiddleware, generateToken } = require('./../jwt.js');

//POST route to add a person 
router.post('/signup', async (req, res) => {
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

      const payload = {
         id: response.id,
         username: response.username
      }
      console.log(JSON.stringify(payload));

      // pass userane in payload 
      const token = generateToken(payload);
      console.log("Token is : ", token);
      res.status(200)
         .json({ response: response, token: token });

   } catch (error) {
      console.log(error);
      res.status(500)
         .json({ error: 'Internal Server Error' });
   }

})

//...Login Route....

router.post('/login', async (req, res) => {
   try {
      // Extract username and password from request body 
      const { username, password } = req.body;

      //Find the user by username
      const user = await Person.findOne({ username: username });
      if (!user || !(await user.comparePassword(password))) {
         return res.status(401).json({ error: 'Invalid username or password' })
      }
      // generates Token 
      const payload = {
         id: user.id,
         username: user.username
      }
      const token = generateToken(payload);
      //return token as a response 
      res.json({ token })

   } catch (error) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
   }
})



// Get method to get the person 
router.get('/', jwtAuthMiddleware, async (req, res) => {
   try {
      const data = await Person.find().lean();
      console.log('Data Fetched Person');
      res
         .status(200)
         .json(data);

   } catch (error) {
      console.log(error);
      res.status(500)
         .json({ error: 'Internal Server Error' });
   }
});

// Profile route...
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
   try {
      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);

      res.status(200).json({ user });
   } catch (error) {
      console.log(error);
      res.status(500)
         .json({ error: 'Internal Server Error' });
   }
});

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

router.put('/:id', async (req, res) => {
   try {
      const personId = req.params._id; //Extract the id from the URL parameter 
      const updatedPersonData = req.body; // Updated data from the person 

      const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
         new: true, // Return the updated document 
         runValidators: true,// Run Mongoose Validation
      })

      if (!response) {
         return res.status(404).json({ error: 'Person not found' });
      }
      console.log('data updated');
      res.status(200).json(response);
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
})

router.delete('/:id', async (req, res) => {
   try {
      const personId = req.params._id;
      // Assuming you have a person model   
      const response = await Person.findByIdAndDelete(personId)
      if (!response) {
         return res.status(404).json({ error: 'Persong not found' });

      }
      console.log(' Data Delete ');
      res.status(200).json({ message: 'Person Deleted Successfully' });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
})

module.exports = router;

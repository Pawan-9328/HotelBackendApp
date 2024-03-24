const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menu.models.js');
const Person = require('../models/person.models.js');



router.post('/', async (req, res) => {
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


router.get('/', async (req, res) => {
   try {
      const data = await MenuItem.find().lean();
      console.log('Data Fetch');
      res
         .status(200)
         .json(data);
   } catch (error) {
      console.log(error);
      res.status(500)
         .json({ error: 'Internal Server Error ' })
   }
})

router.get('/:tasteType', async (req, res) => {
   try {
      const tasteType = req.params;
      if (tasteType == 'spicy' || tasteType == 'sweet' || tasteType == 'sour') {
         const response = await MenuItem.find({ taste: tasteType });
         console.log('Response Fetched');
         res.status(200).json(response)

      } else {
         res.status(404).json({ error: 'Invalid work type ' });

      }

   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
})

router.put('/:id', async (req, res) => {
   try {
      const personId = req.params; //Extract the id from the URL parameter 
      const updatedPersonData = req.body; // Updated data from the person 

      const response = await Person.findByIdAndUpdate(personId, updatedPersonDate, {
         new: true, // Return the updated document 
         runValidators: true // Run Mongoose Validation
      })
      if (!updatedPersonData) {
         return res.status(404).json({ error: 'Person not found' });
      }
      console.log('data updated');
      res.status(200).json(response);
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
})



module.exports = router;
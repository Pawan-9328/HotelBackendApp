const mongoose = require('mongoose');

// Define the person schema....
const personSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   age: {
      type: Number,

   },
   work: {
      type: String,
      // is compulsory one filed 
      enum: ['chef', 'waiter', 'manager'],
      required: true,
   },
   mobile: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   address: {
      type: String,
      required: true,
   },
   salary: {
      type: Number,
      required: true,
   },
   username: {
      required: type,
      type: String,
   },
   password: {
      required: type,
      type: String,
   }


})

// Create Person Model 
const Person = mongoose.model('Person', personSchema);
module.exports = Person;

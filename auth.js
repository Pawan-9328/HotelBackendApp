const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person.models.js') // Adjust the path as needed


passport.use(new LocalStrategy(async (USERNAME, password, done) => {
   // authentication logic here 
   try {
      // console.log('Received creadentials:', USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
         return done(null, false, { message: 'Incorrect username ' });
      }
      const isPasswordMatch = user.comparePassword(password);

      if (!isPasswordMatch) {
         return done(null, user);
      } else {
         return done(null, false, { message: 'Incorrect password' });
      }
   } catch (error) {
      return done(err);

   }
}))

module.exports = passport; // ..Export configured passport..


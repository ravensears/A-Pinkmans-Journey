import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Local User Model
import User from '../models/user.js';

const passportConfig = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
             // Match User
             User.findOne({ username: username })
             .then(user => {
                 if(!user) {
                     return done(null, false, { message: 'Email is not registered'});
                 }
                 // Match Password
                 bcrypt.compare(password, user.password, (err, isMatch) => {
                     if(err) throw err;

                     if(isMatch) {
                         return done(null, user);
                     } else {
                         return done(null, false, { message: 'Password is incorrect'});
                     }
                 });
             })
             .catch(err => console.log(err));
        })
    );
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
  
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
}

export default passportConfig;
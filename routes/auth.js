require('dotenv').config()

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

const bcrypt = require('bcryptjs');
const router = express.Router();

// passport.use(new LocalStrategy(function verify(username, password, cb) {
//   db.get('SELECT rowid AS id, * FROM users WHERE username = ?', [ username ], function(err, row) {
//     if (err) { return cb(err); }
//     if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

//     crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//       if (err) { return cb(err); }
//       if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
//         return cb(null, false, { message: 'Incorrect username or password.' });
//       }
//       return cb(null, row);
//     });
//   });
// }));

passport.use(
    new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
        // Match User
        User.findOne({ username: username })
            .then(user => {
                // Create new User
                if (!user) {
                    const newUser = new User({ username, password });
                    // Hash password before saving in database
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    return done(null, user);
                                })
                                .catch(err => {
                                    return done(null, false, { message: err });
                                });
                        });
                    });
                    // Return other user
                } else {
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Wrong password" });
                        }
                    });
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    })
);

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
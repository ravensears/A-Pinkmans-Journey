import express from "express";
const router = express.Router();

import bcrypt from "bcryptjs";
const app = express();
import passport from "passport";

// User Model
import User from "../models/user.js";

// Login Page
router.get("/login", (req, res) => res.render("login"));

// Register Page
router.get("/register", (req, res) => res.render("register"));

// Register Handle
router.post("/register", (req, res) => {
  const { username, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!username || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // Check passwords match
  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      username,
      password,
      password2,
    });
  } else {
    // Validation Pass
    User.findOne({ username: username }).then((user) => {
      if (user) {
        // User Exists
        errors.push({ msg: "Username is already registered" });
        res.render("register", {
          errors,
          username,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          username,
          password,
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

//Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/game",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

export default router;

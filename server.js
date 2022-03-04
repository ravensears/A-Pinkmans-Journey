require('dotenv').config()

const PORT = 3000;
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const mongo = require('mongodb');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//Passport COnfig
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));
  
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.get('/game', (_req, res) => {
  res.sendFile(__dirname + '/index.html')
});


// Server
app.use(cors());
app.use(express.json());
app.use(express.static('src'));

app.listen(PORT, console.log(`Server running on  ${PORT}`));

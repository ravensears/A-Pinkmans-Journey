import dotenv from "dotenv";
dotenv.config();

const PORT = 3000;
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import cors from 'cors';
const app = express();
import mongoose from 'mongoose';
import mongo from 'mongodb';
import flash from 'connect-flash';
import session from 'express-session';

//Passport COnfig
import passport from "passport";
import passportConfig from "./config/passport.js";
passportConfig(passport);

// DB Config
import MongoURI from './config/keys.js';
const db = MongoURI;

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
import indexRouter from './routes/index.js';
app.use('/', indexRouter);
import usersRouter from './routes/users.js'
app.use('/users', usersRouter);

app.get('/game', (_req, res) => {
  res.render('game')
});


// Server
app.use(cors());
app.use(express.json());
app.use(express.static('src'));

// app.listen(PORT, console.log(`Server running on  ${PORT}`));
app.listen(process.env.PORT || 3000);

app.set('view engine','ejs'); 

app.engine('ejs', require('ejs').__express);
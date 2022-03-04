require('dotenv').config()

const PORT = 3000;
const express = require('express');
const cors = require('cors');
const app = express();
const authRouter = require('./routes/auth');

const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');

const mongoose = require('mongoose');
const mongo = require('mongodb');
const db = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.smmbi.mongodb.net/lonelyDev?retryWrites=true&w=majority`

mongoose.connect(db)
  .then(result => app.listen(PORT))
  .catch((err) => console.log('error'));

app.use(cors())
app.use(express.json());
app.use(express.static('src'));
app.use('/', authRouter);

app.set('views', (__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/index.html')
}); 
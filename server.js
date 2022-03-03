require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const mongo = require('mongodb');

const User = require('./models/user');
const app = express();
const db = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.smmbi.mongodb.net/lonelyDev?retryWrites=true&w=majority`

mongoose.connect(db)
  .then(result => app.listen(PORT))
  .catch((err) => console.log('error'));

const PORT = 3000;

app.use(cors())
app.use(express.json());
app.use(express.static('src'));

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/username', (req, res) => {
  const user = new User({
    username: 'angryGuy',
  });

  user.save()
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    console.log(err);
  });
})


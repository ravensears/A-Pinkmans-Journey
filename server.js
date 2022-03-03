require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongo = require('mongodb');
const app = express();
const db = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.smmbi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const PORT = 3000;

app.use(cors())
app.use(express.json());
app.use(express.static('src'));

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.listen(PORT);
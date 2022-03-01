const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors())

app.use(express.json());

app.use(express.static('src'));

app.get('/', (_req, res) => {
  res.sendFile('/Users/victoriablack/Projects/Makers/final-project/RPG-Game/index.html')
});

app.listen(PORT);
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors())

app.use(express.json());

app.use(express.static('src'));

app.get('/', (_req, res) => {
  res.sendFile('/Users/neto/Projects/final_project/RPG-Game/index.html')
});

app.listen(PORT);
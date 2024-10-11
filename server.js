const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/examen')
  .then(() => console.log('estas conectado a MongoDB para tu examen'))
  .catch(err => console.error(err));

const User = require('./models/User');
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post('/api/users', async (req, res) => {
  const { name, email, age } = req.body;
  
  const user = new User({ name, email, age });
  
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`servidor iniciado en http://localhost:${PORT}`);
});

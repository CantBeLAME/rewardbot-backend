const express = require('express');
const userSchema = require('../models/userModel'); // Adjust the path if necessary
const router = express.Router();

// Create a new user
router.post('/user', async (req, res) => {
  
  try {
    const newItem = new userSchema({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: 'user',
      data: [],
    });
    console.log(newItem);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating new user');
  }
});

// Get all users
router.get('/user', async (req, res) => {
  try {
    const items = await userSchema.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred while fetching users');
  }
});

// Get a user by ID
router.get('/user/:id', async (req, res) => {
  try {
    const item = await userSchema.findById(req.params.id);
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred while fetching user by ID');
  }
});

// Get a user by email
router.get('/user/email/:email', async (req, res) => {
  try {
    const item = await userSchema.findOne({ email: req.params.email });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred while fetching user by email');
  }
});

module.exports = router;

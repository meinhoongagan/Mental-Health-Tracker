// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const userSchema = require('../schemas/userSchema');

// Create a new user with an optional profile picture
router.post('/users', async (req, res) => {
  try {

    await userSchema.validateAsync(req.body);

    const { username, email, password, profilePicture } = req.body;
    const user = await User.create({ username, email, password, profilePicture });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user profile picture
router.put('/users/:id', async (req, res) => {
  try {
    await userSchema.validateAsync(req.body);
    const { profilePicture } = req.body;
    const user = await User.update({ profilePicture }, { where: { id: req.params.id } });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users',async (req,res)=>{
  try{
    const users = await User.findAll();
    res.status(200).json(users);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;

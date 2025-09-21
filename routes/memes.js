const express = require('express');

const router = express.Router();

const Meme = require('../models/Meme');

router.get('/', async (req, res) => {
  try {
    const memes = req.query.userId
      ? await Meme.find({ userId: req.query.userId }) : await Meme.find();

    res.json(memes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const meme = new Meme(req.body);

    const saved = await meme.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
 

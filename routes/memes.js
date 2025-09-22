const express = require('express');
const router = express.Router();
const Meme = require('../models/Meme');
const admin = require('../models/firebase'); // Import initialized admin

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

    // Send FCM notification to all users
    await admin.messaging().send({
      topic: 'all_memes',
      notification: {
        title: 'New Meme Nearby!',
        body: `${saved.caption || 'A new meme was just posted. Check it out!'}`
      },
      data: {
        memeId: saved._id.toString(),
        imageUrl: saved.imageUrl || ''
      }
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
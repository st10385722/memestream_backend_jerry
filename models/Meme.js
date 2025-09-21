const mongoose = require('mongoose');

const MemeSchema = new mongoose.Schema({

  userId: { type: String, required: true },

  imageUrl: { type: String, required: true },

  caption: { type: String },

  lat: { type: Number },

  lng: { type: Number },

  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meme', MemeSchema);
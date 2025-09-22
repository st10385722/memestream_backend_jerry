const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5999;

app.use(cors());

app.use('/memes', require('./routes/memes'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(' Connected to MongoDB');

  app.listen(PORT, () =>
    console.log(` Server running on http://localhost:${PORT}`)
  );
})
.catch(err => {
  console.error(' MongoDB error:', err);
});
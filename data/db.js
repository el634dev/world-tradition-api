// Set up Mongoose connection here.
require('dotenv').config();
const mongoose = require('mongoose');
const db = mongoose.connection;

// --------------------
// Mongoose Setup
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Mongo'));

// Model for traditions
const mongoose = require('mongoose');

// Schemas
const traditionsSchema = new mongoose.Schema({
  country: String,
  language: String,
  tradition: { type: String, required: true },
  holiday: { type: String, required: true },
});

// Setup so we can use in other areas
const Tradition = mongoose.model('Tradition', traditionsSchema);
module.exports = Tradition;

// Model for traditions
const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

// Schemas
const traditionsSchema = new Schema({
  country: String,
  language: String,
  tradition: { type: String, required: true },
  holiday: { type: String, required: true },
});

// Setup so we can use in other areas
const Tradition = mongoose.model('Tradition', traditionsSchema);
module.exports = Tradition;

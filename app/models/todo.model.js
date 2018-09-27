const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
  title: String,
  done: Boolean,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Note', TodoSchema);

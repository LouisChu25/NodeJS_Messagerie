const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const messageSchema = mongoose.Schema({
  msg: { type: String, required: true },
  user: { type: Object, required: true }
});

messageSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Message', messageSchema);
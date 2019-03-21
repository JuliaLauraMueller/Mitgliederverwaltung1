const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String }
});

schema.set('toJSON', { virtuals: true });
// hello world

module.exports = mongoose.model('Circle', schema);

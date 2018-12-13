const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  companyName: { type: String },
  companyURL: { type: String }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Circle', schema);

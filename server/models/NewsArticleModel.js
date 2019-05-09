const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: { type: String },
  article: { type: String },
  author: { type: String },
  date: { type: Date }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('NewsArticle', schema);

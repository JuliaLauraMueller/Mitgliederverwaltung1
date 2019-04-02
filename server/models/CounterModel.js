const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    sequenceVal: { type: Number }
  },
  { collection: 'counter' }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Counter', schema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  company: { type: Schema.Types.ObjectId },
  companyStreet: { type: String },
  companyStreetNr: { type: Number },
  companyZip: { type: Number },
  companyCity: { type: String }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('CompanyLocation', schema);

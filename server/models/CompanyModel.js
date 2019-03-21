const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  companyName: { type: String },
  companyURL: { type: String },
  companyStreet: { type: String },
  companyStreetNr: { type: Number },
  companyZip: { type: Number },
  companyCity: { type: String }
});

//TODO: Add definition off mongoDB collection

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Company', schema);

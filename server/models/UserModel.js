const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  privateEmail: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  membernumber: { type: Number, unique: true, required: true },
  entryDate: { type: Date, required: true },
  birthdate: { type: Date, required: true },
  status: { type: String },
  circle: { type: Schema.Types.ObjectId },
  godfather: { type: Schema.Types.ObjectId },
  salutation: { type: String },
  title: { type: String },
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  alias: { type: String },
  sector: { type: String },
  job: { type: String, required: true },
  function: { type: String },
  company: { type: Schema.Types.ObjectId },
  companyTel: { type: String },
  companyMobile: { type: String },
  companyEmail: { type: String, unique: true, required: true },
  privateTel: { type: String },
  privateMobile: { type: String },
  privateStreet: { type: String, required: true },
  privateStreetNr: { type: Number, required: true },
  privateZip: { type: Number, required: true },
  privateCity: { type: String, required: true },
  invoiceAddress: { type: Boolean },
  xingLink: { type: String },
  linkedinLink: { type: String },
  facebookLink: { type: String },
  instagramLink: { type: String },
  offerings: { type: String }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);

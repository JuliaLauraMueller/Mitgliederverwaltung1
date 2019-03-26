const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  privateEmail: { type: String },
  password: { type: String },

  memberNumber: { type: Number },
  status: { type: String },
  entryDate: { type: Date },
  birthdate: { type: Date },
  status: { type: String },
  circle: { type: Schema.Types.ObjectId },
  godfather: { type: Schema.Types.ObjectId },
  salutation: { type: String },
  title: { type: String },
  firstname: { type: String },
  surname: { type: String },
  alias: { type: String },
  sector: { type: String },
  job: { type: String },
  function: { type: String },
  company: { type: Schema.Types.ObjectId },
  companyTel: { type: String },
  companyMobile: { type: String },
  companyEmail: { type: String },
  privateTel: { type: String },
  privateMobile: { type: String },
  privateStreet: { type: String },
  privateStreetNr: { type: Number },
  privateZip: { type: Number },
  privateCity: { type: String },
  invoiceAddress: { type: Boolean },
  xingLink: { type: String },
  linkedinLink: { type: String },
  facebookLink: { type: String },
  instagramLink: { type: String },
  offerings: { type: String }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);

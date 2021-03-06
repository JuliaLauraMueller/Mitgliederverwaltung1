const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: { type: String },
  imageTag: { type: String },
  image: { type: Buffer },
  description: { type: String },
  circles: [{ type: Schema.Types.ObjectId, ref: 'Circle' }],
  date: { type: Date },
  startTime: { type: String },
  endTime: { type: String },
  location: { type: String },
  organisationTeam: { type: String },
  registrationEndDate: { type: Date },
  permittedRoles: [Number],
  attendees: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      accompaniments: Number
    }
  ]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Event', schema);

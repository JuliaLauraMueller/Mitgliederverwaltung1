const db = require('../helpers/db');
const mongoose = require('mongoose');
const Event = db.Event;

module.exports = {
  getById,
  getAll,
  updateEvent,
  deleteEvent,
  create,
  getCirclesForId,
  removeCircleFromEvents,
  addAttendee,
  removeAttendee
};

async function getById(id) {
  let event = await Event.findById(id)
    .populate('circles')
    .populate('attendees.user', 'firstname surname');
  if (event.image) {
    let buff = Buffer.from(event.image);
    let b64 = buff.toString('base64');
    event = event.toObject();
    event.image = b64;
  }
  return event;
}

async function getAll() {
  let aggregation = Event.aggregate([
    { $unwind: '$circles' },
    {
      $lookup: {
        from: 'circles',
        localField: 'circles',
        foreignField: '_id',
        as: 'circleValues'
      }
    },
    { $unwind: '$circleValues' },
    { $unwind: '$permittedRoles' },
    {
      $group: {
        _id: '$_id',
        title: { $first: '$title' },
        image: { $first: '$image' },
        imageTag: { $first: '$imageTag' },
        description: { $first: '$description' },
        date: {
          $first: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }
        },
        startTime: { $first: '$startTime' },
        endTime: { $first: '$endTime' },
        location: { $first: '$location' },
        organisationTeam: { $first: '$organisationTeam' },
        registrationEndDate: {
          $first: {
            $dateToString: { format: '%Y-%m-%d', date: '$registrationEndDate' }
          }
        },
        circles: { $addToSet: '$circles' },
        circleValues: { $addToSet: '$circleValues' },
        permittedRoles: { $addToSet: '$permittedRoles' }
      }
    },
    { $sort: { date: 1 } }
  ]);
  aggregation.options = { collation: { locale: 'de' } };
  return await aggregation.exec();
}

async function updateEvent(id, eventParam) {
  const event = await Event.findById(id);
  if (!event) throw 'Event not found';

  // convert base64 data to binary for backend
  if (eventParam.image) {
    eventParam.image = Buffer.from(eventParam.image, 'base64');
  }

  let errors = validate(eventParam);
  if (errors.length != 0) {
    throw { type: 'invalid_input', errors };
  }

  await Event.updateOne({ _id: id }, eventParam);
}

async function deleteEvent(id) {
  let event = await getById(id);
  if (event) {
    await Event.findByIdAndRemove(id);
  }
}

async function create(eventParam) {
  if (eventParam.image) {
    eventParam.image = Buffer.from(eventParam.image, 'base64');
  }
  let errors = validate(eventParam);
  if (errors.length != 0) {
    throw { type: 'invalid_input', errors };
  }

  try {
    return await Event.create(eventParam);
  } catch (error) {
    throw { type: 'processing_error', error };
  }
}

function validate(eventParam) {
  let errorMessages = [];
  if (!eventParam.title || eventParam.title.length == 0) {
    errorMessages.push('Titel darf nicht leer sein.');
  } else if (eventParam.title.length > 30) {
    errorMessages.push('Titel muss kürzer als 30 Zeichen sein.');
  }
  if (eventParam.description && eventParam.description.length > 700) {
    errorMessages.push('Beschreibung muss kürzer als 700 Zeichen sein.');
  }
  if (!eventParam.location || eventParam.location.length == 0) {
    errorMessages.push('Ort darf nicht leer sein.');
  } else if (eventParam.location.length > 30) {
    errorMessages.push('Ort muss kürzer als 30 Zeichen sein.');
  }
  if (!eventParam.circles || eventParam.circles.length == 0) {
    errorMessages.push('Es muss mindestens eine City angewählt sein.');
  }
  if (!Date.parse(eventParam.date)) {
    errorMessages.push('Kein gültiges Datum (Empfohlenes Format: YYYY-DD-MM)');
  }
  if (!eventParam.startTime || eventParam.startTime.length == 0) {
    errorMessages.push('Beginn darf nicht leer sein.');
  }
  if (!Date.parse(eventParam.registrationEndDate)) {
    errorMessages.push(
      'Kein gültiger Anmeldeschluss (Empfohlenes Format: YYYY-MM-DD)'
    );
  }
  if (
    Date.parse(eventParam.date) < Date.parse(eventParam.registrationEndDate)
  ) {
    errorMessages.push('Datum darf nicht vor dem Anmeldeschluss liegen.');
  }
  if (!eventParam.permittedRoles || eventParam.permittedRoles.length == 0) {
    errorMessages.push('Es muss mindestens eine Rolle angewählt sein.');
  }
  //ProfilePic
  if (eventParam.image) {
    if (
      eventParam.imageTag !== 'data:image/png;base64' &&
      eventParam.imageTag !== 'data:image/jpeg;base64'
    ) {
      errorMessages.push('Dateityp muss jpg/jpeg/png sein');
    } else if (eventParam.image.toString().length > 500000) {
      errorMessages.push('Bild zu gross, maximal 500KB');
    }
  }
  return errorMessages;
}

async function getCirclesForId(id) {
  const event = await Event.findById(id, 'circles');

  if (!event) {
    throw 'Event not found';
  }

  return event.circles;
}

async function removeCircleFromEvents(circleId) {
  await Event.updateMany({
    $pull: { circles: mongoose.Types.ObjectId(circleId) }
  });
}

async function addAttendee(eventId, userId, accompanimentsAmount) {
  const event = await Event.findById(eventId);
  if (!event) throw 'Event not found';

  const originalAttendee = event.attendees.find(a => a.user == userId);
  if (originalAttendee) {
    originalAttendee.accompaniments = accompanimentsAmount;
  } else {
    var attendee = {
      user: userId,
      accompaniments: accompanimentsAmount
    };
    event.attendees.push(attendee);
  }

  await event.save();
  let returnEvent = await Event.findById(eventId)
    .populate('circles')
    .populate('attendees.user', 'firstname surname');

  if (returnEvent.image) {
    let buff = Buffer.from(returnEvent.image);
    let b64 = buff.toString('base64');
    returnEvent = returnEvent.toObject();
    returnEvent.image = b64;
  }
  return returnEvent;
}

async function removeAttendee(eventId, userId) {
  const event = await Event.findById(eventId);
  if (!event) throw 'Event not found';

  const index = event.attendees.findIndex(att => att.user == userId);
  event.attendees.splice(index, 1);

  await event.save();
  let returnEvent = await Event.findById(eventId)
    .populate('circles')
    .populate('attendees.user', 'firstname surname');

  if (returnEvent.image) {
    let buff = Buffer.from(returnEvent.image);
    let b64 = buff.toString('base64');
    returnEvent = returnEvent.toObject();
    returnEvent.image = b64;
  }
  return returnEvent;
}

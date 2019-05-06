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
  return await Event.findById(id)
    .populate('circles')
    .select();
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

async function addAttendee(eventId, userId, accompaniments) {
  const event = await Event.findById(eventId);
  if (!event) throw 'Event not found';

  const attendee = event.attendees.find(a => a.user === userId);
  if (attendee) {
    attendee.accompaniments = accompaniments;
  } else {
    attendee.user = userId;
    attendee.accompaniments = accompaniments;
    event.attendees.push(attendee);
  }

  return await event.save();
}

async function removeAttendee(eventId, userId) {
  const event = await Event.findById(eventId);
  if (!event) throw 'Event not found';

  event.attendees.splice(event.findIndex(a => a.user === userId), 1);

  return await event.save();
}

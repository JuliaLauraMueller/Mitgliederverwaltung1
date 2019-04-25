const db = require('../helpers/db');
const Circle = db.Circle;
const User = db.User;
const eventService = require('./eventService');

module.exports = {
  getById,
  getAll,
  updateCircle,
  deleteCircle,
  create
};

async function getById(id) {
  return await Circle.findById(id).select();
}

async function getAll() {
  return Circle.find()
    .collation({ locale: 'de' })
    .sort({ name: 1 });
}

async function updateCircle(id, circleParam) {
  const circle = await Circle.findById(id);
  if (!circle) throw 'Circle not found';

  let errors = validate(circleParam);
  if (errors.length != 0) {
    throw { type: 'invalid_input', errors };
  }

  await Circle.updateOne({ _id: id }, circleParam, function(err, res) {
    if (err) throw err;
  });
}

async function deleteCircle(id) {
  if ((await User.countDocuments({ circle: id })) > 0) {
    throw {
      type: 'users_remaining_in_circle',
      message: 'Cities mit Mitgliedern können nicht gelöscht werden.'
    };
  } else {
    await Circle.findByIdAndRemove(id);
    await eventService.removeCircleFromEvents(id);
  }
}

async function create(circleParam) {
  let errors = validate(circleParam);
  if (errors.length != 0) {
    throw { type: 'invalid_input', errors };
  }

  try {
    return await Circle.create(circleParam);
  } catch (error) {
    throw { type: 'processing_error', error };
  }
}

function validate(circleParam) {
  let errorMessages = [];
  if (!circleParam.name || circleParam.name.length == 0) {
    errorMessages.push('Name darf nicht leer sein.');
  } else if (circleParam.name.length > 30) {
    errorMessages.push('Name muss kürzer als 30 Zeichen sein.');
  }
  return errorMessages;
}

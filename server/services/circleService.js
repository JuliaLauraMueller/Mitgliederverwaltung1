const db = require('../helpers/db');
const Circle = db.Circle;
const User = db.User;

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
  return Circle.find();
}

async function updateCircle(id, circleParam) {
  const circle = await Circle.findById(id);
  if (!circle) throw 'Circle not found';

  // TODO check for correct input

  await Circle.updateOne({ _id: id }, circleParam, function(err, res) {
    if (err) throw err;
  });
}

async function deleteCircle(id) {
  if ((await User.count({ circle: id })) > 0) {
    throw 'cannot delete circle with members';
  } else {
    await Circle.findByIdAndRemove(id);
  }
}

async function create(circleParam) {
  validate(circleParam);

  const circle = new Circle(circleParam);

  // save circle
  return await circle.save();
}

function validate(circleParam) {
  let errorMessage;
  if (!circleParam.name || circleParam.name.length == 0) {
    errorMessage = 'Name darf nicht leer sein.';
  } else if (circleParam.name.length > 30) {
    errorMessage = 'Name muss kürzer als 30 Zeichen sein.';
  }
  if (errorMessage) {
    throw { type: 'invalid_input', errorMessage };
  }
}

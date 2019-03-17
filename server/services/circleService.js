const db = require('../helpers/db');
const Circle = db.Circle;
const User = db.User;

module.exports = {
  getById,
  getAll,
  updateCircle,
  deleteCircle
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
  console.log('Count: ', await User.count({ circle: id }));
  if ((await User.count({ circle: id })) > 0) {
    throw 'cannot delete circle with members';
  } else {
    await Circle.findByIdAndRemove(id);
  }
}

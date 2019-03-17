const db = require('../helpers/db');
const Circle = db.Circle;
const User = db.User;

module.exports = {
  getById,
  getAll,
  deleteCircle
};

async function getById(id) {
  return await Circle.findById(id).select();
}

async function getAll() {
  return Circle.find();
}

async function deleteCircle(id) {
  console.log('Count: ', await User.count({ circle: id }));
  if ((await User.count({ circle: id })) > 0) {
    throw 'cannot delete circle with members';
  } else {
    await Circle.findByIdAndRemove(id);
  }
}

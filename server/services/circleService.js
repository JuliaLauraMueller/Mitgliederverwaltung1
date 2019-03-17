const db = require('../helpers/db');
const Circle = db.Circle;

module.exports = {
  getById,
  getAll,
  updateCircle
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

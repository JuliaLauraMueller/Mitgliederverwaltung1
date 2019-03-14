const db = require('../helpers/db');
const Circle = db.Circle;

module.exports = {
  getById,
  getAll
};

async function getById(id) {
  return await Circle.findById(id).select();
}

async function getAll() {
  return Circle.find();
}

const db = require('../helpers/db');
const Circle = db.Circle;

module.exports = {
  getById
};

async function getById(id) {
  return await Circle.findById(id).select();
}

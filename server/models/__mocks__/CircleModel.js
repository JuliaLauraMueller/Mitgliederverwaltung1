module.exports = {
  findById,
  findOne
};

let cricles = [
  {
    id: '0',
    name: 'correct',
    save() {}
  },

  {
    id: '1',
    name: 'incorrect',
    save() {}
  }
];

async function findById(id) {
  var result = circles.find(circle => circle.id == id);
  if (result == undefined) {
    return null;
  }

  return result;
}

async function findOne(search) {
  var result = circles.find(circle => {
    return circle.privateEmail == search.privateEmail;
  });
  return result;
}

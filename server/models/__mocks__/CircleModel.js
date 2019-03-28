module.exports = {
  findById,
  findOne,
  updateOne
};

let circles = [
  {
    id: '0',
    name: 'Brugg',
    save() {}
  },

  {
    id: '1',
    name: 'Aarau',
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

async function updateOne(idObject, param) {
  var result = await findById(idObject._id);
  result.name = param.name;
}

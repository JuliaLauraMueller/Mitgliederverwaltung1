module.exports = {
  findById,
  findOne,
  updateOne,
  aggregate,
  create,
  findByIdAndRemove
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
  },
  {
    id: 'BBBBBBBBBBBBBBBBBBBBBBBB', // must be a String of 12 bytes or 24 hex characters
    name: 'CircleToDelete',
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

async function aggregate(args) {
  return circles;
}

async function create(circle) {
  circle._id = 'newCircle';
  circles.push(circle);
  return circle;
}

async function findByIdAndRemove(id) {
  circles = circles.filter(circle => {
    return circle.id != id;
  });
}

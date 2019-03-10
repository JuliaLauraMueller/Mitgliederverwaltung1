module.exports = {
  findById,
  findOne
};

function findById(id) {
  var user = null;
  if (id == 0) {
    user = null;
  } else {
    user = {
      privateEmail: 'correct@gmail.com',
      entryDate: '1.1.11',
      birthdate: '1.1.11',
      status: 'active',
      circle: 'circle',
      godfather: 'godfather',
      salutation: 'salutation',
      title: 'mr',
      firstname: 'max',
      surname: 'muster',
      alias: 'mm',
      sector: 'sector',
      job: 'job'
    };
  }
  return user;
}

function findOne(str) {
  if (str.privateEmail === 'alreadyThere') {
    return true;
  }
  return false;
}

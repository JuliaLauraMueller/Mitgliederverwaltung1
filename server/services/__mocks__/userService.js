const config = require('../../config/settings.js');
const bcrypt = require('bcryptjs');

module.exports = {
  getAll,
  update,
  authenticate
};

function getAll() {
  console.log('mock get all.');
}

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

const findOne = str => {
  if (str === 'alreadyThere') {
    return true;
  }
  return false;
};

function update(id, userParam) {
  const user = findById(id);

  // validate
  if (!user) throw 'User not found';
  if (
    user.privateEmail !== userParam.privateEmail &&
    findOne(userParam.privateEmail)
  ) {
    throw 'email "' + userParam.privateEmail + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  return user;
}

function authenticate({ privateEmail, password }) {
  if (!privateEmail || !password) {
    return {};
  }

  const user = { password: bcrypt.hashSync('correct_password', 10) };
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = { token: 'token' };
    return token;
  }
}

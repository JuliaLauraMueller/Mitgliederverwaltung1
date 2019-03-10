const config = require('../config/settings');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const User = db.User;

module.exports = {
  authenticate,
  create,
  getById,
  getAll,
  generateJwtToken,
  removeAllCompanyRelations,
  update,
  updateUser
};

async function authenticate({ privateEmail, password }) {
  if (!privateEmail || !password) {
    return {};
  }
  const user = await User.findOne({ privateEmail: privateEmail.toLowerCase() });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = generateJwtToken(user);
    return token;
  }
}

function getAll() {
  return User.find().select('-password');
}

async function getById(id) {
  return await User.findById(id).select('-password');
}

async function create(userParam) {
  // validate
  if (await User.findOne({ privateEmail: userParam.privateEmail })) {
    throw 'email "' + userParam.privateEmail + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}

async function updateUser(id, userParam) {
  const user = await User.findById(id);
  console.log('UPDATE');
  console.log(id);
  console.log(user);

  if (!user) throw 'User not found';

  // TODO check for correct input

  Object.assign(user, userParam);
  console.log(user);

  var query = { _id: id };
  await User.updateOne(query, user, function(err, res) {
    if (err) throw err;
  });
  //await user.save();
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw 'User not found';
  if (
    user.privateEmail !== userParam.privateEmail &&
    (await User.findOne({ privateEmail: userParam.privateEmail }))
  ) {
    throw 'email "' + userParam.privateEmail + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
  await removeAllGodfathers(id);
}

async function removeAllGodfathers(id) {
  User.updateMany({ godfather: { $eq: id } }, { $set: { godfather: '' } });
}

async function removeAllCompanyRelations(id) {
  User.updateMany({ company: { $eq: id } }, { $set: { company: '' } });
}

function generateJwtToken(user) {
  const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
    expiresIn: config.jwtExpirationSeconds
  });
  return token;
}

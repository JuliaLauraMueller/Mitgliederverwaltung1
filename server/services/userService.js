const config = require('../config/settings');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const User = db.User;
const Company = db.Company;

module.exports = {
  authenticate,
  create,
  getById,
  getAll,
  generateJwtToken,
  removeAllCompanyRelations
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

async function getAll() {
  let users = [];
  let usersCopy = await User.find({}, '-password', function(err, loadedUsers) {
    loadedUsers.forEach(u => {
      users.push({
        id: u._id,
        firstname: u.firstname,
        surname: u.surname,
        privateEmail: u.privateEmail,
        privateTel: u.privateTel,
        job: u.job,
        function: u.function,
        sector: u.sector,
        company: u.company,
        circle: u.circle
      });
    });
    return loadedUsers;
  });
  let companyIDs = users.map(user => user.company);
  await Company.find({ _id: { $in: companyIDs } }, function(err, companies) {
    if (err) {
      console.log(err);
      return;
    }
    users.forEach(user => {
      let company = companies.find(c => {
        return c._id.equals(user.company); // ObjectID comparison
      });
      user.company = company ? company.companyStreet : ''; // change to company.companyName
    });
    return usersCopy;
  });
  return users;
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

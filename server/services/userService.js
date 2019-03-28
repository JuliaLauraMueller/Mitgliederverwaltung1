const config = require('../config/settings');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const validateUrl = require('../helpers/urlValidator');
const isValidEmail = require('../helpers/emailValidator');
const mongoose = require('mongoose');
const companyService = require('./companyService');
const User = db.User;
const Company = db.Company;
const Counter = db.Counter;

module.exports = {
  update,
  authenticate,
  create,
  getCircleForId,
  getById,
  getAll,
  generateJwtToken,
  removeAllCompanyRelations,
  update,
  updateUser,
  deleteUser
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
  let users = await User.aggregate([
    { $project: { password: 0 } },
    {
      $lookup: {
        from: 'companies',
        localField: 'company',
        foreignField: '_id',
        as: 'companyValues'
      }
    },
    {
      $lookup: {
        from: 'circles',
        localField: 'circle',
        foreignField: '_id',
        as: 'circleValues'
      }
    },
    { $sort: { memberNumber: 1 } }
  ]);
  return users;
}

async function getCircleForId(id) {
  return await User.findById(id, 'circle');
}

async function getById(id) {
  return await User.findById(id).select('-password');
}

async function create(userParam) {
  let errors = await validateBasic(userParam);
  if (errors.length != 0) {
    throw { type: 'invalid_input', errors };
  }

  // generate new member number
  userParam.memberNumber = await getNextSequenceValue();

  // hash password
  if (userParam.password) {
    userParam.password = bcrypt.hashSync(userParam.password, 10);
  }

  try {
    // create company for user
    let company = await companyService.createEmpty();
    userParam.company = company._id;
    // create user
    return await User.create(userParam);
  } catch (error) {
    throw { type: 'processing_error', error };
  }
}

async function validateBasic(userParam) {
  let errorMessages = [];
  if (!userParam.privateEmail) {
    errorMessages.push('E-Mail darf nicht leer sein.');
  } else {
    let existingUser = await User.findOne({
      privateEmail: userParam.privateEmail
    });
    if (existingUser && existingUser._id != userParam._id) {
      errorMessages.push('Diese E-Mail Adresse gibt es schon.');
    } else if (!isValidEmail(userParam.privateEmail)) {
      errorMessages.push('Email ist ungültig.');
    }
  }
  if (!userParam.firstname || userParam.firstname.length == 0) {
    errorMessages.push('Vorname darf nicht leer sein.');
  } else if (userParam.firstname.length > 30) {
    errorMessages.push('Vorname muss kürzer als 30 Zeichen sein.');
  }
  if (!userParam.surname || userParam.surname.length == 0) {
    errorMessages.push('Nachname darf nicht leer sein.');
  } else if (userParam.surname.length > 30) {
    errorMessages.push('Nachname muss kürzer als 30 Zeichen sein.');
  }
  if (!userParam.password || userParam.password.length == 0) {
    errorMessages.push('Passwort darf nicht leer sein.');
  } else if (userParam.password.length < 7) {
    errorMessages.push('Passwort muss länger als 7 Zeichen sein.');
  } else if (userParam.password.length > 30) {
    errorMessages.push('Passwort muss kürzer als 30 Zeichen sein.');
  }
  if (!userParam.circle) {
    errorMessages.push('City darf nicht leer sein.');
  }
  return errorMessages;
}

async function getNextSequenceValue() {
  let c = await Counter.findOne(); // get counter
  var count = await Counter.findByIdAndUpdate(c._id, {
    $inc: { sequenceVal: 1 }
  });
  return count.sequenceVal;
}

async function updateUser(id, userParam) {
  const user = await User.findById(id);
  if (!user) throw 'User not found';

  // TODO check for correct input
  userParam = validateInputs(userParam);

  var query = { _id: id };
  await User.updateOne(query, userParam, function(err, res) {
    if (err) throw err;
  });
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) {
    throw 'User not found';
  }

  userParam.privateEmail = userParam.privateEmail.toLowerCase();
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

async function deleteUser(id) {
  let user = await getById(id);
  if (user) {
    await User.findByIdAndRemove(id);
    await Company.findByIdAndRemove(user.company);
    await removeAllGodfathers(id);
  }
}

async function removeAllGodfathers(id) {
  User.updateMany(
    { godfather: { $eq: mongoose.Types.ObjectId(id) } },
    { $set: { godfather: undefined } }
  );
}

async function removeAllCompanyRelations(id) {
  User.updateMany(
    { company: { $eq: mongoose.Types.ObjectId(id) } },
    { $set: { company: undefined } }
  );
}

function generateJwtToken(user) {
  const token = jwt.sign(
    { _id: user._id, role: user.role, circle: user.circle },
    config.jwtSecret,
    {
      expiresIn: config.jwtExpirationSeconds
    }
  );
  return token;
}

function validateInputs(userParam) {
  //URL'S
  if (userParam.xingLink) {
    userParam.xingLink = validateUrl(userParam.xingLink);
  }
  if (userParam.linkedinLink) {
    userParam.linkedinLink = validateUrl(userParam.linkedinLink);
  }
  if (userParam.facebookLink) {
    userParam.facebookLink = validateUrl(userParam.facebookLink);
  }
  if (userParam.instagramLink) {
    userParam.instagramLink = validateUrl(userParam.instagramLink);
  }

  // TODO: reload of site after input validation
  return userParam;
}

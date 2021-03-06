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
  updateUser,
  deleteUser,
  changeRole,
  changePassword
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
  let aggregation = User.aggregate([
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
    { $sort: { firstname: 1 } }
  ]);
  aggregation.options = { collation: { locale: 'de' } };
  return await aggregation.exec();
}

async function getCircleForId(id) {
  const user = await User.findById(id, 'circle');

  if (!user) {
    throw 'User not found';
  }

  return user.circle;
}

async function getById(id) {
  let user = await User.findById(id).select('-password');
  if (user.avatar) {
    let buff = Buffer.from(user.avatar);

    let b64 = buff.toString('base64');
    user = user.toObject();
    user.avatar = b64;
  }

  return user;
}

async function create(userParam) {
  let errors = await validateBasic(userParam);
  if (errors.length != 0) {
    throw { type: 'invalid_input', errors };
  }

  // generate new member number
  userParam.memberNumber = await getNextSequenceValue();
  userParam.role = 0;

  // hash password
  if (userParam.password) {
    userParam.password = bcrypt.hashSync(userParam.password, 10);
  }

  // set entry date
  userParam.entryDate = new Date();

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
      errorMessages.push('Email ist ung??ltig.');
    }
  }
  if (!userParam.firstname || userParam.firstname.length == 0) {
    errorMessages.push('Vorname darf nicht leer sein.');
  } else if (userParam.firstname.length > 30) {
    errorMessages.push('Vorname muss k??rzer als 30 Zeichen sein.');
  }
  if (!userParam.surname || userParam.surname.length == 0) {
    errorMessages.push('Nachname darf nicht leer sein.');
  } else if (userParam.surname.length > 30) {
    errorMessages.push('Nachname muss k??rzer als 30 Zeichen sein.');
  }
  if (!userParam.password || userParam.password.length == 0) {
    errorMessages.push('Passwort darf nicht leer sein.');
  } else if (userParam.password.length < 7) {
    errorMessages.push('Passwort muss l??nger als 7 Zeichen sein.');
  } else if (userParam.password.length > 30) {
    errorMessages.push('Passwort muss k??rzer als 30 Zeichen sein.');
  }
  if (userParam.godfather && userParam.godfather.length > 40) {
    errorMessages.push('Name des G??ttis muss k??rzer als 40 Zeichen sein.');
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

  var userData = userParam.userData;
  var companyData = userParam.companyData;

  userData = updateURLs(userData, companyData);
  var errors = [];

  if (userData.avatar) {
    try {
      userData.avatar = Buffer.from(userData.avatar, 'base64');
    } catch (e) {
      errors.push('Profilbild: Bild korrupt');
    }
  }
  errors = await validateAll(userData, errors);
  errors = companyService.validateCompany(companyData, errors);

  if (errors.length != 0) {
    throw { type: 'invalid_input', errors };
  } else {
    var query = { _id: id };
    companyData._id = companyData.company_id;
    delete companyData.company_id;
    try {
      await companyService.update(companyData._id, companyData);
      await User.updateOne(query, userData);
      return await User.findById(id).select('-password');
    } catch (error) {
      throw { type: 'processing_error', error };
    }
  }
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
  if (userParam.avatar) {
    userParam.avatar = Buffer.from(userParam.avatar, 'base64');
  }

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

function updateURLs(userParam, companyParam) {
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
  if (companyParam.companyURL) {
    companyParam.companyURL = validateUrl(companyParam.companyURL);
  }

  return userParam;
}

async function changeRole(id, role) {
  const user = await User.findById(id);

  if (!user) {
    throw 'User not found';
  }

  user.role = role;
  await user.save();
}

async function changePassword(id, passwords) {
  const user = await User.findById(id);

  if (!user) {
    throw 'Benutzer nicht gefunden';
  } else if (!bcrypt.compareSync(passwords.oldPassword, user.password)) {
    throw {
      type: 'invalid_input',
      msg: 'Aktuelles Passwort ist nicht korrekt'
    };
  } else if (passwords.newPassword1 === '' || passwords.newPassword2 === '') {
    throw { type: 'invalid_input', msg: 'Das Passwort darf nicht leer sein' };
  } else if (passwords.newPassword1 !== passwords.newPassword2) {
    throw {
      type: 'invalid_input',
      msg: 'Die neuen Passw??rter stimmen nicht ??berein'
    };
  } else if (passwords.newPassword1.length < 7) {
    throw {
      type: 'invalid_input',
      msg: 'Passwort muss l??nger als 7 Zeichen sein.'
    };
  } else if (passwords.newPassword1.length > 30) {
    throw {
      type: 'invalid_input',
      msg: 'Passwort muss k??rzer als 30 Zeichen sein.'
    };
  } else {
    user.password = bcrypt.hashSync(passwords.newPassword1, 10);

    await user.save();
  }
}

async function validateAll(userParam, errors) {
  // Fields that cannot change yet
  if (userParam.memberNumber) {
    errors.push('Mitgliedernummer: Darf nicht ge??ndert werden');
  }
  if (userParam.city) {
    errors.push('City: Darf nicht ge??ndert werden');
  }
  if (userParam.godfather) {
    errors.push('G??tti: Darf nicht ge??ndert werden');
  }

  //Links
  var URLexpr = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if (userParam.xingLink) {
    if (!URLexpr.test(userParam.xingLink)) {
      errors.push('Xing: Kein g??ltiger Link');
    }
  }
  if (userParam.linkedinLink) {
    if (!URLexpr.test(userParam.linkedinLink)) {
      errors.push('LinkedIn: Kein g??ltiger Link');
    }
  }
  if (userParam.facebookLink) {
    if (!URLexpr.test(userParam.facebookLink)) {
      errors.push('Facebook: Kein g??ltiger Link');
    }
  }
  if (userParam.instagramLink) {
    if (!URLexpr.test(userParam.instagramLink)) {
      errors.push('Instagram: Kein g??ltiger Link');
    }
  }

  // Personal data
  if (userParam.offerings && userParam.offerings.length > 150) {
    errors.push('Angebot: Maximal 150 Zeichen');
  }
  if (userParam.salutation) {
    if (userParam.salutation !== 'Herr' && userParam.salutation !== 'Frau') {
      errors.push('Anrede: Muss entweder Herr oder Frau sein');
    }
  }
  if (userParam.title && userParam.title.length > 15) {
    errors.push('Titel: Maximal 15 Zeichen');
  }
  if (!userParam.firstname) {
    errors.push('Vorname: Darf nicht leer sein');
  } else if (
    userParam.firstname.length < 2 &&
    userParam.firstname.length > 30
  ) {
    errors.push('Vorname: Muss zwischen 2 und 30 Zeichen haben');
  }
  if (!userParam.surname) {
    errors.push('Nachname: Darf nicht leer sein');
  } else if (userParam.surname.length < 2 && userParam.surname.length > 30) {
    errors.push('Nachname: Muss zwischen 2 und 30 Zeichen haben');
  }
  if (userParam.alias && userParam.alias.length > 30) {
    errors.push('Spitzname: Maximal 30 Zeichen');
  }
  if (userParam.status && userParam.status.length > 30) {
    errors.push('Status: Maximal 30 Zeichen');
  }
  if (userParam.entryDate) {
    var testEntryDate = Date.parse(userParam.entryDate);
    if (!testEntryDate) {
      errors.push(
        'Beitritt: Kein g??ltiges Datum (Empfohlenes Format: DD-MM-YYYY)'
      );
    }
  }
  if (userParam.birthdate) {
    var testBirthdate = Date.parse(userParam.birthdate);
    if (!testBirthdate) {
      errors.push(
        'Geburtstag: Kein g??ltiges Datum (Empfohlenes Format: DD-MM-YYYY)'
      );
    }
  }
  // Business data
  if (userParam.sector && userParam.sector.length > 30) {
    errors.push('Branche: Maximal 30 Zeichen');
  }
  if (userParam.job && userParam.job.length > 30) {
    errors.push('Beruf: Maximal 30 Zeichen');
  }
  if (userParam.function && userParam.function.length > 30) {
    errors.push('Funktion: Maximal 30 Zeichen');
  }
  if (userParam.companyTel) {
    if (
      (!userParam.companyTel.startsWith('+') ||
        userParam.companyTel.startsWith('0')) &&
      userParam.companyTel.length > 15
    ) {
      errors.push('Tel Gesch??ft: Ist keine g??ltige Telefonnummer');
    }
  }
  if (userParam.companyMobile) {
    if (
      (!userParam.companyMobile.startsWith('+') ||
        userParam.companyMobile.startsWith('0')) &&
      userParam.companyMobile.length > 15
    ) {
      errors.push('Mobile Gesch??ft: Ist keine g??ltige Telefonnummer');
    }
  }
  if (userParam.companyEmail) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userParam.companyEmail)) {
      errors.push('E-Mail Gesch??ft: Ist keine Mailadresse');
    }
  }
  if (userParam.privateTel) {
    if (
      (!userParam.privateTel.startsWith('+') ||
        userParam.privateTel.startsWith('0')) &&
      userParam.privateTel.length > 15
    ) {
      errors.push('Tel Privat: Ist keine g??ltige Telefonnummer');
    }
  }
  if (userParam.privateMobile) {
    if (
      (!userParam.privateMobile.startsWith('+') ||
        userParam.privateMobile.startsWith('0')) &&
      userParam.privateMobile.length > 15
    ) {
      errors.push('Mobile Privat: Ist keine g??ltige Telefonnummer');
    }
  }
  if (!userParam.privateEmail) {
    errors.push('E-Mail Privat: Darf nicht leer sein');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userParam.privateEmail)) {
    errors.push('E-Mail Privat: Ist keine Mailadresse');
  } else {
    let existingUser = await User.findOne({
      privateEmail: userParam.privateEmail
    });
    if (existingUser && existingUser._id != userParam._id) {
      errors.push('E-Mail Privat: Die Mailadresse gibt es schon');
    }
  }

  if (userParam.privateStreet && userParam.privateStreet.length > 30) {
    errors.push('Strasse Privat: Maximal 30 Zeichen');
  }
  if (userParam.privateStreetNr && userParam.privateStreetNr.length > 8) {
    errors.push('Nr. Privat: Maximal 8 Zeichen');
  }
  if (userParam.privateZip) {
    if (
      //typeof userParam.privateZip == 'number' &&
      !/^[0-9]*$/.test(userParam.privateZip) ||
      (userParam.privateZip < 1000 || userParam.privateZip > 9999)
    ) {
      errors.push('PLZ Privat: Keine Zahl zwischen 1000 und 9999');
    }
  }
  if (userParam.privateCity && userParam.privateCity.length > 30) {
    errors.push('Ort Privat: Maximal 30 Zeichen');
  }

  //ProfilePic
  if (userParam.avatar) {
    if (
      userParam.avatarTag !== 'data:image/png;base64' &&
      userParam.avatarTag !== 'data:image/jpeg;base64'
    ) {
      errors.push('Profilbild: Dateityp muss jpg/jpeg/png sein');
    } else if (userParam.avatar.toString().length > 500000) {
      errors.push('Profilbild: Bild zu gross, maximal 500KB');
    }
  }
  return errors;
}

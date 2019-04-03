const config = require('../config/settings');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const validateUrl = require('../helpers/urlValidator');
const companyService = require('../services/companyService');
const User = db.User;
const Company = db.Company;

module.exports = {
  update,
  authenticate,
  create,
  getById,
  getAll,
  generateJwtToken,
  removeAllCompanyRelations,
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
  userParam.privateEmail = userParam.privateEmail.toLowerCase();
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
  if (!user) throw 'User not found';

  var userData = userParam.userData;
  var companyData = userParam.companyData;

  userData = updateURLs(userData, companyData);
  var errors = [];
  errors = validateAll(userData, errors);
  errors = companyService.validateCompany(companyData, errors);

  if (errors.length != 0) {
    throw { type: 'invalid_input', errors };
  } else {
    var query = { _id: id };
    try {
      await companyService.update(companyData._id, companyData);
      return await User.updateOne(query, userData);
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

  // TODO: reload of site after input validation
  return userParam;
}

function validateAll(userParam, errors) {
  // Fields that cannot change yet
  if (userParam.memberNumber) {
    errors.push('Mitgliedernummer: Darf nicht geändert werden');
  }
  if (userParam.city) {
    errors.push('City: Darf nicht geändert werden');
  }
  if (userParam.godfather) {
    errors.push('Götti: Darf nicht geändert werden');
  }

  //Links
  var URLexpr = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if (userParam.xingLink) {
    if (!URLexpr.test(userParam.xingLink)) {
      errors.push('Xing: Kein gültiger Link');
    }
  }
  if (userParam.linkedinLink) {
    if (!URLexpr.test(userParam.linkedinLink)) {
      errors.push('LinkedIn: Kein gültiger Link');
    }
  }
  if (userParam.facebookLink) {
    if (!URLexpr.test(userParam.facebookLink)) {
      errors.push('Facebook: Kein gültiger Link');
    }
  }
  if (userParam.instagramLink) {
    if (!URLexpr.test(userParam.instagramLink)) {
      errors.push('Instagram: Kein gültiger Link');
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
    userParam.firstname.length > 20
  ) {
    errors.push('Vorname: Muss zwischen 2 und 20 Zeichen haben');
  }
  if (!userParam.surname) {
    errors.push('Nachname: Darf nicht leer sein');
  } else if (userParam.surname.length < 2 && userParam.surname.length > 20) {
    errors.push('Nachname: Muss zwischen 2 und 20 Zeichen haben');
  }
  if (userParam.alias && userParam.alias.length > 20) {
    errors.push('Spitzname: Maximal 20 Zeichen');
  }
  if (userParam.status && userParam.status.length > 20) {
    errors.push('Status: Maximal 20 Zeichen');
  }
  if (userParam.entryDate) {
    var testEntryDate = Date.parse(userParam.entryDate);
    if (!testEntryDate) {
      errors.push(
        'Beitritt: Kein gültiges Datum (Empfohlenes Format: DD-MM-YYYY)'
      );
    }
  }
  if (userParam.birthdate) {
    var testBirthdate = Date.parse(userParam.birthdate);
    if (!testBirthdate) {
      errors.push(
        'Geburtstag: Kein gültiges Datum (Empfohlenes Format: DD-MM-YYYY)'
      );
    }
  }
  // Business data
  if (userParam.sector && userParam.sector.length > 20) {
    errors.push('Branche: Maximal 20 Zeichen');
  }
  if (userParam.job && userParam.job.length > 20) {
    errors.push('Beruf: Maximal 20 Zeichen');
  }
  if (userParam.function && userParam.function.length > 20) {
    errors.push('Funktion: Maximal 20 Zeichen');
  }
  if (userParam.companyTel) {
    if (
      (!userParam.companyTel.startsWith('+') ||
        userParam.companyTel.startsWith('0')) &&
      userParam.companyTel.length > 15
    ) {
      errors.push('Tel Geschäft: Ist keine gültige Telefonnummer');
    }
  }
  if (userParam.companyMobile) {
    if (
      (!userParam.companyMobile.startsWith('+') ||
        userParam.companyMobile.startsWith('0')) &&
      userParam.companyMobile.length > 15
    ) {
      errors.push('Mobile Geschäft: Ist keine gültige Telefonnummer');
    }
  }
  if (userParam.companyEmail) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userParam.companyEmail)) {
      errors.push('E-Mail Geschäft: Ist keine Mailadresse');
    }
  }
  if (userParam.privateTel) {
    if (
      (!userParam.privateTel.startsWith('+') ||
        userParam.privateTel.startsWith('0')) &&
      userParam.privateTel.length > 15
    ) {
      errors.push('Tel Privat: Ist keine gültige Telefonnummer');
    }
  }
  if (userParam.privateMobile) {
    if (
      (!userParam.privateMobile.startsWith('+') ||
        userParam.privateMobile.startsWith('0')) &&
      userParam.privateMobile.length > 15
    ) {
      errors.push('Mobile Privat: Ist keine gültige Telefonnummer');
    }
  }
  if (
    !userParam.privateEmail ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userParam.privateEmail)
  ) {
    errors.push('E-Mail Privat: Ist keine Mailadresse');
  }
  if (userParam.privateStreet && userParam.privateStreet.length > 20) {
    errors.push('Strasse Privat: Maximal 20 Zeichen');
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
  if (userParam.privateCity && userParam.privateCity.length > 25) {
    errors.push('Ort Privat: Maximal 25 Zeichen');
  }
  return errors;
}

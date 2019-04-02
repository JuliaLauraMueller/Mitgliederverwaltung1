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
  //Links

  if (userParam.xingLink) {
    if (!userParam.xingLink.startsWith('https://')) {
      errors.push('Der Link für das Xing-Profil ist ungültig');
    }
  }
  if (userParam.linkedinLink) {
    if (!userParam.linkedinLink.startsWith('https://')) {
      errors.push('Der Link für das LinkedIn-Profil ist ungültig');
    }
  }
  if (userParam.facebookLink) {
    if (!userParam.facebookLink.startsWith('https://')) {
      errors.push('Der Link für das Facebook-Profil ist ungültig');
    }
  }
  if (userParam.instagramLink) {
    if (!userParam.instagramLink.startsWith('https://')) {
      errors.push('Der Link für das Instagram-Profil ist ungültig');
    }
  }

  // Personal data
  if (userParam.offerings && userParam.offerings.length > 150) {
    errors.push('Das Feld Angebot ist zu lang.');
  }
  if (userParam.salutation) {
    if (userParam.salutation !== 'Herr' && userParam.salutation !== 'Frau') {
      errors.push('Das Feld Anrede ist falsch');
    }
  }
  if (userParam.title && userParam.title.length > 15) {
    errors.push('Das Feld Titel ist zu lang');
  }
  if (
    !userParam.firstname ||
    (userParam.firstname.length < 2 && userParam.firstname.length > 20)
  ) {
    errors.push('Das Feld Vorname ist nicht korrekt');
  }
  if (
    !userParam.surname ||
    (userParam.surname.length < 2 && userParam.surname.length > 20)
  ) {
    errors.push('Das Feld Nachname ist nicht korrekt');
  }
  if (userParam.alias && userParam.alias.length > 20) {
    errors.push('Das Feld Spitzname ist nicht korrekt');
  }
  if (userParam.status && userParam.status.length > 20) {
    errors.push('Das Feld Status ist nicht korrekt');
  }
  if (userParam.entryDate) {
    var testEntryDate = Date.parse(userParam.entryDate);
    if (!testEntryDate) {
      errors.push(
        'Das Feld Eintrittsdatum ist nicht korrekt. Empfohlenes Format: DD-MM-YYY'
      );
    }
  }
  if (userParam.birthdate) {
    var testBirthdate = Date.parse(userParam.birthdate);
    if (!testBirthdate) {
      errors.push(
        'Das Feld Geburtsdatum ist nicht korrekt. Empfohlenes Format: DD-MM-YYY'
      );
    }
  }
  // Business data
  if (userParam.sector && userParam.sector.length > 20) {
    errors.push('Das Feld Sektor ist zu lang');
  }
  if (userParam.job && userParam.job.length > 20) {
    errors.push('Das Feld Beruf ist zu lang');
  }
  if (userParam.function && userParam.function.length > 20) {
    errors.push('Das Feld Funktion ist zu lang');
  }
  if (userParam.companyTel) {
    if (
      (!userParam.companyTel.startsWith('+') ||
        userParam.companyTel.startsWith('0')) &&
      userParam.companyTel.length > 15
    ) {
      errors.push('Das Feld Geschäftstelefon ist nicht korrekt');
    }
  }
  if (userParam.companyMobile) {
    if (
      (!userParam.companyMobile.startsWith('+') ||
        userParam.companyMobile.startsWith('0')) &&
      userParam.companyMobile.length > 15
    ) {
      errors.push('Das Feld Geschäftshandy ist nicht korrekt');
    }
  }
  if (userParam.companyEmail) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userParam.companyEmail)) {
      errors.push('Das Feld Geschäftsmail ist nicht korrekt');
    }
  }
  if (userParam.privateTel) {
    if (
      (!userParam.privateTel.startsWith('+') ||
        userParam.privateTel.startsWith('0')) &&
      userParam.privateTel.length > 15
    ) {
      errors.push('Das Feld Telefon privat ist nicht korrekt');
    }
  }
  if (userParam.privateMobile) {
    if (
      (!userParam.privateMobile.startsWith('+') ||
        userParam.privateMobile.startsWith('0')) &&
      userParam.privateMobile.length > 15
    ) {
      errors.push('Das Feld Handy privat ist nicht korrekt');
    }
  }
  if (
    !userParam.privateEmail ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userParam.privateEmail)
  ) {
    errors.push('Das Feld Email privat ist nicht korrekt');
  }
  if (userParam.privateStreet && userParam.privateStreet.length > 20) {
    errors.push('Das Feld Strasse privat ist nicht korrekt');
  }
  if (userParam.privateStreetNr && userParam.privateStreetNr.length > 8) {
    errors.push('Das Feld Strassennummer privat ist nicht korrekt');
  }
  if (userParam.privateZip) {
    if (userParam.privateZip < 1000 || userParam.privateZip > 9999) {
      errors.push('Das Feld Postleitzahl privat ist nicht korrekt');
    }
  }
  if (userParam.privateCity && userParam.privateCity.length > 25) {
    errors.push('Das Feld Stadt privat ist nicht korrekt');
  }
  if (userParam.invoiceAddress && userParam.invoiceAddress > 20) {
    errors.push('Das Feld Rechnungsadresse ist nicht korrekt');
  }

  return errors;
}

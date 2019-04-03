const db = require('../helpers/db');
const Company = db.Company;
const userService = require('../services/userService');

module.exports = {
  getAll,
  getById,
  update,
  _delete,
  validateCompany
};

async function getAll() {
  return await Company.find().select();
}

async function getById(id) {
  return await Company.findById(id).select();
}

async function update(id, companyParam) {
  const company = await Company.findById(id);
  if (!company) throw 'Company not found';

  var query = { _id: id };
  await Company.updateOne(query, companyParam);
}

async function _delete(id) {
  await Company.findByIdAndRemove(id);
  await userService.removeAllCompanyLocRelations(id);
}

function validateCompany(companyParam, errors) {
  if (companyParam.companyName && companyParam.companyName.length > 20) {
    errors.push('Das Feld Firmenname ist nicht korrekt');
  }
  if (companyParam.companyStreet && companyParam.companyStreet.length > 20) {
    errors.push('Das Feld Strasse Firma ist nicht korrekt');
  }
  if (companyParam.companyStreetNr && companyParam.companyStreetNr.length > 8) {
    errors.push('Das Feld Strassennummer Firma ist nicht korrekt');
  }
  if (companyParam.companyZip) {
    if (companyParam.companyZip < 1000 || companyParam.companyZip > 9999) {
      errors.push('Das Feld Postleitzahl Firma ist nicht korrekt');
    }
  }
  if (companyParam.companyCity && companyParam.companyCity.length > 25) {
    errors.push('Das Feld Stadt Firma ist nicht korrekt');
  }
  if (companyParam.companyURL) {
    if (!companyParam.companyURL.startsWith('https://')) {
      errors.push('Das Feld URL Firma ist nicht korrekt');
    }
  }

  return errors;
}

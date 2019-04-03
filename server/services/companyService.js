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
    errors.push('Firma: Maximal 20 Zeichen');
  }
  if (companyParam.companyStreet && companyParam.companyStreet.length > 20) {
    errors.push('Strasse Geschäft: Maximal 20 Zeichen');
  }
  if (companyParam.companyStreetNr && companyParam.companyStreetNr.length > 8) {
    errors.push('Strasse Geschäft: Maximal 8 Zeichen');
  }
  if (companyParam.companyZip) {
    if (
      !/^[0-9]*$/.test(userParam.privateZip) ||
      (companyParam.companyZip < 1000 || companyParam.companyZip > 9999)
    ) {
      errors.push('PLZ Geschäft: Muss eine Zahl zwischen 1000 und 9999 sein');
    }
  }
  if (companyParam.companyCity && companyParam.companyCity.length > 25) {
    errors.push('Ort Geschäft: Maximal 25 Zeichen');
  }
  var expr = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if (companyParam.companyURL) {
    if (!expr.test(companyParam.companyURL)) {
      errors.push('URL Firma: Keine gültige URL');
    }
  }

  return errors;
}

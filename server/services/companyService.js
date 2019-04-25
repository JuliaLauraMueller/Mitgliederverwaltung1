const db = require('../helpers/db');
const Company = db.Company;
const userService = require('../services/userService');

module.exports = {
  getById,
  update,
  _delete,
  createEmpty,
  validateCompany
};

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
  if (companyParam.companyName && companyParam.companyName.length > 30) {
    errors.push('Firma: Maximal 30 Zeichen');
  }
  if (companyParam.companyStreet && companyParam.companyStreet.length > 30) {
    errors.push('Strasse Geschäft: Maximal 30 Zeichen');
  }
  if (companyParam.companyStreetNr && companyParam.companyStreetNr.length > 8) {
    errors.push('Strasse Geschäft: Maximal 8 Zeichen');
  }
  if (companyParam.companyZip) {
    if (
      !/^[0-9]*$/.test(companyParam.companyZip) ||
      (companyParam.companyZip < 1000 || companyParam.companyZip > 9999)
    ) {
      errors.push('PLZ Geschäft: Muss eine Zahl zwischen 1000 und 9999 sein');
    }
  }
  if (companyParam.companyCity && companyParam.companyCity.length > 30) {
    errors.push('Ort Geschäft: Maximal 30 Zeichen');
  }
  var expr = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if (companyParam.companyURL) {
    if (!expr.test(companyParam.companyURL)) {
      errors.push('URL Firma: Keine gültige URL');
    }
  }

  return errors;
}

async function createEmpty() {
  // save company
  try {
    return await Company.create({});
  } catch (error) {
    throw { type: 'processing_error', error };
  }
}

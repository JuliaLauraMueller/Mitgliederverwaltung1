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
  await Company.updateOne(query, companyParam, function(err, res) {
    if (err) throw err;
  });
}

async function _delete(id) {
  await Company.findByIdAndRemove(id);
  await userService.removeAllCompanyLocRelations(id);
}

function validateCompany(companyParam, errors) {
  return errors;
}

const db = require('../helpers/db');
const Company = db.Company;
const usersService = require('../services/userService');

module.exports = {
  getAll,
  getById,
  update,
  _delete
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

  // Copy companyParam properties to company
  Object.assign(company, companyParam);
  await company.save();
}

async function _delete(id) {
  await Company.findByIdAndRemove(id);
  await usersService.removeAllCompanyLocRelations(id);
}

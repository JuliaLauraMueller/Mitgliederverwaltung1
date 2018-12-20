const db = require('../helpers/db');
const CompanyLocation = db.CompanyLocation;
const usersService = require('../services/userService');

module.exports = {
  getAll,
  getById,
  update,
  _delete,
  removeAllCompanyLocRelations
};

async function getAll() {
  return await CompanyLocation.find().select();
}

async function getById(id) {
  return await CompanyLocation.findById(id).select();
}

async function update(id, companyLocationParam) {
  const companyLocation = await CompanyLocation.findById(id);
  if (!companyLocation) throw 'CompanyLocation not found';

  // Copy companyLocationParam properties to companyLocation
  Object.assign(companyLocation, companyLocationParam);
  await companyLocation.save();
}

async function _delete(id) {
  await CompanyLocation.findByIdAndRemove(id);
  await usersService.removeAllCompanyRelations(id);
}

async function removeAllCompanyLocRelations(id) {
  CompanyLocation.updateMany(
    { company: { $eq: id } },
    { $set: { company: '' } }
  );
}

const db = require('../helpers/db');
const Company = db.Company;
const usersService = require('../services/userService');

module.exports = {
  getById,
  update,
  _delete,
  createEmpty
};

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
  await usersService.removeAllCompanyLocRelations(id);
}

async function createEmpty() {
  // save company
  try {
    return await Company.create({});
  } catch (error) {
    throw { type: 'processing_error', error };
  }
}

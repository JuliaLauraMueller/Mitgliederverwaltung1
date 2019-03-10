const config = require('../../config/settings.js');

module.exports = {
  update
};

function findById(id) {
  var company = null;
  if (id == 0) {
    company = null;
  } else {
    company = {
      companyName: 'companyName',
      companyURL: 'companyURL'
    };
  }
  return company;
}

function update(id, companyParam) {
  const company = findById(id);
  if (!company) throw 'Company not found';

  // Copy companyParam properties to company
  Object.assign(company, companyParam);
  return company;
}

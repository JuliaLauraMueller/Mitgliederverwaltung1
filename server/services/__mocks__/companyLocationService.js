const config = require('../../config/settings.js');

module.exports = {
  update
};

function findById(id) {
  var companyLocation = null;
  if (id == 0) {
    companyLocation = null;
  } else {
    companyLocation = {
      company: 'companyid',
      companyStreet: 'companyStreet',
      companyStreetNr: 'companyStreetNr',
      companyZip: 'companyZip',
      companyCity: 'companyCity'
    };
  }
  return companyLocation;
}

function update(id, companyLocationParam) {
  const companyLocation = findById(id);
  if (!companyLocation) throw 'CompanyLocation not found';

  // Copy companyLocationParam properties to companyLocation
  Object.assign(companyLocation, companyLocationParam);
  return companyLocation;
}

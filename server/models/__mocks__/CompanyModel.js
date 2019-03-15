module.exports = {
  findById
};

let companies = [
  {
    id: '0',
    companyName: 'companyName',
    companyURL: 'companyURL',
    companyStreet: 'companyStreet',
    companyStreetNr: 'companyStreetNr',
    companyZip: 'companyZip',
    companyCity: 'companyCity',
    save() {}
  }
];

async function findById(id) {
  var result = companies.find(company => company.id == id);
  if (result == undefined) {
    return null;
  }

  return result;
}

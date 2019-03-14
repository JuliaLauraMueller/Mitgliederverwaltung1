module.exports = {
  findById,
  findByIdAndRemove
};

let companyLocations = [
  {
    id: '0',
    company: 'company',
    companyStreet: 'companyStreet',
    companyStreetNr: 'companyStreetNr',
    companyZip: 'companyZip',
    companyCity: 'companyCity',
    save() {}
  }
];

async function findById(id) {
  var result = companyLocations.find(
    companyLocation => companyLocation.id == id
  );
  if (result == undefined) {
    return null;
  }

  return result;
}
async function findByIdAndRemove(id) {
  console.log('this hits the company location model mock.');
}

module.exports = {
  findById,
  create,
  updateOne,
  aggregate,
  findByIdAndRemove
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

async function updateOne(query, companyParam) {
  companies.forEach(company => {
    if (company.id == query._id) {
      company.companyName = companyParam.companyName;
      company.companyURL = companyParam.companyURL;
      company.companyStreet = companyParam.companyStreet;
      company.companyStreetNr = companyParam.companyStreetNr;
      company.companyZip = companyParam.companyZip;
      company.companyCity = companyParam.companyCity;
    }
  });
}

async function create(company) {
  company._id = 'newCompany';
  companies.push(company);
  return company;
}

async function aggregate(args) {
  return companies;
}

async function findByIdAndRemove(id) {
  companies = companies.filter(user => {
    return user.id != id;
  });
}

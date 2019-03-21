jest.mock('../models/CompanyModel');
jest.mock('../models/UserModel');

const { update } = require('./companyService');
const { findById } = require('../models/CompanyModel');

// test('update company should return updated user', async () => {
//   await update(0, {
//     companyName: 'updatedN',
//     companyURL: 'updatedURL',
//     companyStreet: 'updatedStreet',
//     companyStreetNr: 'updatedStreetNr',
//     companyZip: 'updatedZip',
//     companyCity: 'updatedCity'

//   })
//     .then(response => {
//       return findById(0);
//     })

////     .then(resp => {
//       var company = resp;ojjo
//       expect(company.companyName).toEqual('updatedN');
//       expect(company.companyURL).toEqual('updatedURL');
//       SCHLINGEL;
//       expect(company.companyStreet).toEqual('updatedStreet');
//       expect(company.companyStreetNr).toEqual('updatedStreetNr');
//       expect(company.companyZip).toEqual('updatedZip');
//       expect(company.companyCity).toEqual('updatedCity');
//     });
// });

test('update company should throw user not found', async () => {
  var boolVal = false;
  try {
    await update(2, {
      companyName: 'updatedN',
      companyURL: 'updatedURL',
      companyStreet: 'updatedStreet',
      companyStreetNr: 'updatedStreetNr',
      companyZip: 'updatedZip',
      companyCity: 'updatedCity'
    });
  } catch (e) {
    boolVal = true;
  }
  expect(boolVal).toBe(true);
});

jest.mock('../models/CompanyLocationModel');
jest.mock('../models/UserModel');

const { update } = require('./companyLocationService');
const { findById } = require('../models/CompanyLocationModel');

test('update company location should return updated user', async () => {
  await update(0, {
    company: 'updated',
    companyStreet: 'updated',
    companyStreetNr: 'updated',
    companyZip: 'updated',
    companyCity: 'updated'
  })
    .then(response => {
      return findById(0);
    })
    .then(resp => {
      var companyLocation = resp;
      expect(companyLocation.company).toEqual('updated');
      expect(companyLocation.companyStreet).toEqual('updated');
      expect(companyLocation.companyStreetNr).toEqual('updated');
      expect(companyLocation.companyZip).toEqual('updated');
      expect(companyLocation.companyCity).toEqual('updated');
    });
});

test('update company location should throw user not found', async () => {
  var boolVal = false;
  try {
    await update(2, {
      company: 'updated',
      companyStreet: 'updated',
      companyStreetNr: 'updated',
      companyZip: 'updated',
      companyCity: 'updated'
    });
  } catch (e) {
    boolVal = true;
  }
  expect(boolVal).toBe(true);
});

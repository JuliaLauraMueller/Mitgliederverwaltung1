jest.mock('../models/CompanyModel');

const { update } = require('./companyService');

const { findById } = require('../models/CompanyModel');

test('update company should return updated user', async () => {
  await update(0, {
    companyName: 'updatedN',
    companyURL: 'updatedURL'
  })
    .then(response => {
      return findById(0);
    })
    .then(resp => {
      var company = resp;
      expect(company.companyName).toEqual('updatedN');
      expect(company.companyURL).toEqual('updatedURL');
    });
});

test('update company should throw user not found', async () => {
  var boolVal = false;
  try {
    await update(2, {
      companyName: 'updated',
      companyURL: 'updated'
    });
  } catch (e) {
    boolVal = true;
  }
  expect(boolVal).toBe(true);
});

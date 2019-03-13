jest.mock('../../server/services/companyLocationService');

const { update } = require('../../server/services/companyLocationService');

test('update company location should return updated user', () => {
  var companyLocation = update(1, {
    company: 'updated',
    companyStreet: 'updated',
    companyStreetNr: 'updated',
    companyZip: 'updated',
    companyCity: 'updated'
  });

  expect(companyLocation).toEqual({
    company: 'updated',
    companyStreet: 'updated',
    companyStreetNr: 'updated',
    companyZip: 'updated',
    companyCity: 'updated'
  });
});

test('update company location should throw user not found', () => {
  var boolVal = false;
  try {
    update(0, {
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

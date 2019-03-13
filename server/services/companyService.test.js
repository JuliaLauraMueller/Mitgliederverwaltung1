jest.mock('../../server/services/companyService');

const { update } = require('../../server/services/companyService');

test('update company should return updated user', () => {
  var company = update(1, {
    companyName: 'updated',
    companyURL: 'updated'
  });

  expect(company).toEqual({
    companyName: 'updated',
    companyURL: 'updated'
  });
});

test('update company should throw user not found', () => {
  var boolVal = false;
  try {
    update(0, {
      companyName: 'updated',
      companyURL: 'updated'
    });
  } catch (e) {
    boolVal = true;
  }
  expect(boolVal).toBe(true);
});

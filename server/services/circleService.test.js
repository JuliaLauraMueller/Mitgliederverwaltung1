jest.mock('../models/CircleModel');

const { updateCircle } = require('./circleService');
const { findById } = require('../models/CircleModel');

test('update circle should return updated circle', async () => {
  await updateCircle(0, {
    name: 'Bern'
  })
    .then(() => {
      return findById(0);
    })
    .then(resp => {
      var circle = resp;
      expect(circle.name).toEqual('Bern');
    });
});

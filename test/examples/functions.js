// Does only work if we have a running axios on this level which we don't
//const axios = required('axios');

const functions = {
  add: (num1, num2) => num1 + num2,
  isNull: () => null,
  checkValue: x => x,
  createUser: () => {
    const user = { firstName: 'Brad' };
    user['lastName'] = 'Traversy';
    return user;
  },
  mockMethod: () => {
    return false;
  }
};

module.exports = functions;

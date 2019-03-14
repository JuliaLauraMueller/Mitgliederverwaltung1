module.exports = {
  findById,
  findOne,
  updateMany
};

let users = [
  {
    id: '0',
    privateEmail: 'correct@gmail.com',
    entryDate: '1.1.11',
    birthdate: '1.1.11',
    status: 'active',
    circle: 'circle',
    godfather: 'godfather',
    salutation: 'salutation',
    title: 'mr',
    firstname: 'max',
    surname: 'muster',
    alias: 'mm',
    sector: 'sector',
    job: 'job',
    save() {}
  },

  {
    id: '1',
    password: '$2a$10$gPHULGi/NTxwgyG7B5NXHOhD7WZ.wCCucOimptihWiktwFFaqGPZa',
    privateEmail: 'alreadytaken@gmail.com',
    save() {}
  }
];

async function findById(id) {
  var result = users.find(user => user.id == id);
  if (result == undefined) {
    return null;
  }

  return result;
}

async function findOne(search) {
  var result = users.find(user => {
    return user.privateEmail == search.privateEmail;
  });
  return result;
}

async function updateMany(obj1, obj2) {
  console.log('update many mock.');
}

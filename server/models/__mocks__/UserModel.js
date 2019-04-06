module.exports = {
  findById,
  findOne,
  updateMany,
  aggregate,
  create,
  findByIdAndRemove,
  count
};

let users = [
  {
    id: '0',
    privateEmail: 'correct@gmail.com',
    entryDate: '1.1.11',
    birthdate: '1.1.11',
    status: 'active',
    circle: '1', // don't change this without changing the corresponding id in the CircleModel mock
    godfather: 'godfather',
    salutation: 'salutation',
    title: 'mr',
    firstname: 'max',
    surname: 'muster',
    alias: 'mm',
    sector: 'sector',
    job: 'job',
    function: 'function',
    company: 'company',
    companyTel: 'companyTel',
    companyMobile: 'companyMobile',
    companyEmail: 'companyEmail',
    privateTel: 'privateTel',
    privateMobile: 'privateMobile',
    privateStreet: 'privateStreet',
    privateStreetNr: 'privateStreetNr',
    privateZip: 'privateZip',
    privateCity: 'privateCity',
    invoiceAddress: 'invoiceAddress',
    xingLink: 'xingLink',
    linkedinLink: 'linkedinLink',
    facebookLink: 'facebookLink',
    instagramLink: 'instragramLink',
    offerings: 'offerings',
    save() {}
  },
  {
    id: '1',
    password: '$2a$10$gPHULGi/NTxwgyG7B5NXHOhD7WZ.wCCucOimptihWiktwFFaqGPZa',
    privateEmail: 'alreadytaken@gmail.com',
    save() {}
  },
  {
    id: 'AAAAAAAAAAAAAAAAAAAAAAAA', // must be a String of 12 bytes or 24 hex characters
    privateEmail: 'toDelete@example.com',
    select(arg) {
      return this;
    }
  }
];

function findById(id) {
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

async function updateMany(obj1, obj2) {}

function aggregate(args) {
  return {
    exec() {
      return users;
    }
  };
}

async function create(user) {
  user._id = 'newUser';
  users.push(user);
  return user;
}

async function findByIdAndRemove(id) {
  users = users.filter(user => {
    return user.id != id;
  });
}

async function count(args) {
  return users.filter(user => user.circle == args.circle).length;
}

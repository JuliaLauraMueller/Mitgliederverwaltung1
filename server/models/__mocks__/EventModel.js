module.exports = {
  findById,
  updateOne,
  aggregate,
  create,
  findByIdAndRemove,
  updateMany
};

let events = [
  {
    id: '0',
    title: 'TestEvent',
    description: 'Description of test event.',
    circles: ['c1', 'c2'],
    date: new Date('07/25/2018'),
    startTime: '18:00',
    endTime: 'open end',
    location: 'At the main entrance',
    organisationTeam: 'Ben, Joe',
    registrationEndDate: new Date('07/20/2018'),
    permittedRoles: [1, 2, 3],
    save() {},
    select(arg) {
      return this;
    }
  },
  {
    id: 'BBBBBBBBBBBBBBBBBBBBBBBB',
    title: 'Second Event',
    description: 'Desc.',
    save() {},
    select(arg) {
      return this;
    }
  }
];

function findById(id) {
  var result = events.find(event => event.id == id);
  if (result == undefined) {
    return null;
  }

  return result;
}

async function updateOne(idObject, param) {
  var result = await findById(idObject._id);
  result.title = param.title;
  result.description = param.description;
  result.circles = param.circles;
  result.date = param.date;
  result.startTime = param.startTime;
  result.endTime = param.endTime;
  result.location = param.location;
  result.organisationTeam = param.organisationTeam;
  result.registrationEndDate = param.registrationEndDate;
  result.permittedRoles = param.permittedRoles;
}

async function updateMany({}) {}

async function aggregate(args) {
  return events;
}

async function create(event) {
  event._id = 'newEvent';
  events.push(event);
  return event;
}

async function findByIdAndRemove(id) {
  events = events.filter(event => {
    return event.id != id;
  });
}

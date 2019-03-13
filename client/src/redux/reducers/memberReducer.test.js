import React from 'react';

//import filterMembers from './memberReducer';
const memberReducer = require('./memberReducer');

const user1 = {
  _id: '1',
  firstname: 'Bruce',
  surname: 'Wayne',
  job: 'Banker',
  function: 'CEO',
  sector: 'Marketing',
  company: 'Bruce Wayne Company',
  circle: 'Bern'
};

const user2 = {
  _id: '2',
  firstname: 'Peter',
  surname: 'Pan',
  job: 'Pilot',
  function: 'Piratenschreck',
  sector: 'Fantasy',
  company: 'PP Company',
  circle: 'Zürich'
};

const user3 = {
  _id: '3',
  firstname: 'Hans',
  surname: 'Göthe',
  job: 'Dichter',
  function: 'Schreiber',
  sector: 'Literatur',
  company: 'Hansiverlag',
  circle: 'Basel'
};

beforeEach(() => (members = [user1, user2, user3]));

test('Filter Prename', () => {});

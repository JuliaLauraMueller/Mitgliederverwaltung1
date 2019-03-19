import store from '../../helpers/store';
import * as actions from '../actions/memberActions';
import axios from 'axios';
import { filterMembers } from './memberReducer';

jest.mock('axios');

const usersFromMockDB = [
  {
    _id: '1',
    firstname: 'Bruce',
    surname: 'Wayne',
    job: 'Banker',
    privateEmail: 'privateEmail',
    privateTel: 'privateTel',
    function: 'CEO',
    sector: 'Marketing',
    company: 'Bruce Wayne Company',
    circle: 'Bern'
  },
  {
    _id: '2',
    firstname: 'Peter',
    surname: 'Pan',
    job: 'Pilot',
    privateEmail: 'privateEmail',
    privateTel: 'privateTel',
    function: 'Piratenschreck',
    sector: 'Fantasy',
    company: 'PP Company',
    circle: 'Zürich'
  },
  {
    _id: '3',
    firstname: 'Hans',
    surname: 'Göthe',
    job: 'Dichter',
    privateEmail: 'privateEmail',
    privateTel: 'privateTel',
    function: 'Schreiber',
    sector: 'Literatur',
    company: 'Hansiverlag',
    circle: 'Basel'
  }
];

describe('redux store member tests', () => {
  it('loads the expected number of members on fetch action', done => {
    const resp = { data: usersFromMockDB };
    axios.get.mockResolvedValue(resp);
    store.dispatch(actions.fetchMembers());

    setTimeout(() => {
      expect(store.getState().member.members.length).toEqual(3);
      done();
    }, 500);
  });
});

describe('search for prename', () => {
  it('searches for the expected members on filterMembers', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'Peter');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      done();
    }, 500);
  });
});

describe('search for surname', () => {
  it('searches for the expected members on filterMembers', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'Pan');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(2);
      done();
    }, 500);
  });
});

describe('search for job', () => {
  it('searches for the expected members on filterMembers', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'pilot');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      done();
    }, 500);
  });
});

describe('search for sector', () => {
  it('searches for the expected members on filterMembers', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'mrketing');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      done();
    }, 500);
  });
});

// describe('search for company', () => {
//   it('searches for the expected members on filterMembers', done => {
//     let filteredMembers = usersFromMockDB;
//     filteredMembers = filterMembers(filteredMembers, 'enterCompanyNameHere');
//     setTimeout(() => {
//       expect(filteredMembers.length).toEqual(1);
//       done();
//     }, 500);
//   });
// });

describe('search for function', () => {
  it('searches for the expected members on filterMembers', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'schri');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      done();
    }, 500);
  });
});

describe('show all if searchText is empty', () => {
  it('searches for the expected members on filterMembers', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, '');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(3);
      done();
    }, 500);
  });
});

describe('show nothing if there is no match', () => {
  it('searches for the expected members on filterMembers', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'jihdshfhgfdhüqsq');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(0);
      done();
    }, 500);
  });
});

describe('show when writing text without umlauts', () => {
  it('searches for the expected members on filterMembers', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'goethe');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      done();
    }, 500);
  });
});

import store from '../../helpers/store';
import * as actions from '../actions/memberActions';
import axios from 'axios';
import { filterMembers } from './memberReducer';
import { filterCircles } from './memberReducer';

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

//TODO: enhance tests if contains... , add more members

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

describe('show only the members who belong to the spefified circle', () => {
  it('filters for expected members in Bern', done => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['Bern'];
    filteredMembers = filterCircles(filteredMembers, checkedCircles);
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      done();
    }, 500);
  });
});

describe('show only the members who belong to the spefified circle', () => {
  it('filters for expected members in Zürich', done => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['Zürich'];
    filteredMembers = filterCircles(filteredMembers, checkedCircles);
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      done();
    }, 500);
  });
});

describe('show only the members who belong to the spefified circle', () => {
  it('filters for expected members in Basel', done => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['Basel'];
    filteredMembers = filterCircles(filteredMembers, checkedCircles);
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      done();
    }, 500);
  });
});

describe('show only the members who belong to the spefified circles', () => {
  it('filters for expected members in multiple cities', done => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['Zürich', 'Bern', 'Basel'];
    filteredMembers = filterCircles(filteredMembers, checkedCircles);
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(3);
      done();
    }, 500);
  });
});

describe('show no members if the circle does not exist', () => {
  it('filters for expected members in a non existant city', done => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['St. Gallen'];
    filteredMembers = filterCircles(filteredMembers, checkedCircles);
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(0);
      done();
    }, 500);
  });
});

describe('show members that fit to the searchText and are filtered by cities', () => {
  it('filters for expected members in a city already filtered by searchText', done => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['Bern'];
    filteredMembers = filterMembers(
      filterCircles(filteredMembers, checkedCircles),
      'Bruce'
    );
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      done();
    }, 500);
  });
});

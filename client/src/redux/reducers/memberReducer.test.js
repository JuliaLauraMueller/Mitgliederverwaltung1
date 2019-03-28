import store from '../../helpers/store';
import * as actions from '../actions/memberActions';
import axios from 'axios';
import { filterMembers } from './memberReducer';
import { filterCircles } from './memberReducer';

jest.mock('axios');
const user1 = {
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
};

const user2 = {
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
};

const user3 = {
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
};

const user4 = {
  _id: '4',
  firstname: 'Peter',
  surname: 'Parker',
  job: 'Journalist',
  privateEmail: 'privateEmail',
  privateTel: 'privateTel',
  function: 'Storywriter',
  sector: 'Journalismus',
  company: 'Berner Zeitung',
  circle: 'Bern'
};

const usersFromMockDB = [user1, user2, user3, user4];

describe('redux store member tests', () => {
  test('loads the expected number of members on fetch action', done => {
    const resp = { data: usersFromMockDB };
    axios.get.mockResolvedValue(resp);
    store.dispatch(actions.fetchMembers());

    setTimeout(() => {
      expect(store.getState().member.members.length).toEqual(
        usersFromMockDB.length
      );
      done();
    }, 500);
  });
});

describe('Test if the searchfilter filters the expected members', () => {
  test('search for firstname Peter', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'Peter');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(2);
      expect(filteredMembers.includes(user2)).toBe(true);
      expect(filteredMembers.includes(user4)).toBe(true);
      done();
    }, 500);
  });

  test('search for surname Parker', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'Parker');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      expect(filteredMembers.includes(user4)).toBe(true);
      done();
    }, 500);
  });

  test('search for job pilot', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'pilot');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      expect(filteredMembers.includes(user2)).toBe(true);
      done();
    }, 500);
  });

  test('search for sector marketing with 1 wrong char', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'mrketing');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      expect(filteredMembers.includes(user1)).toBe(true);
      done();
    }, 500);
  });

  test('search for sector marketing with 2 wrong chars', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'metketing');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(0);
      done();
    }, 500);
  });

  test('search for company Hansiverlag with uncompleted searchtext', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'Hansiverl');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      done();
    }, 500);
  });

  test('search for function Schreiber with uncompleted searchtext and 1 wrong char', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'schri');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      expect(filteredMembers.includes(user3)).toBe(true);
      done();
    }, 500);
  });

  test('searching with an empty searchtext', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, '');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(usersFromMockDB.length);
      done();
    }, 500);
  });

  test('searching for nonexistant entry', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'jihdshfhgfdhüqsq');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(0);
      done();
    }, 500);
  });

  test('checking if umlauts are ignored', done => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'goethe');
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      expect(filteredMembers.includes(user3)).toBe(true);
      done();
    }, 500);
  });
});

describe('Test if the circle filter filters the expected members', () => {
  test('filters for expected members in Bern', done => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['Bern'];
    filteredMembers = filterCircles(filteredMembers, checkedCircles);
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(2);
      expect(filteredMembers.includes(user1)).toBe(true);
      expect(filteredMembers.includes(user4)).toBe(true);
      done();
    }, 500);
  });

  test('filters for expected members in Zürich', done => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['Zürich'];
    filteredMembers = filterCircles(filteredMembers, checkedCircles);
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      expect(filteredMembers.includes(user2)).toBe(true);
      done();
    }, 500);
  });

  test('filters for expected members in Basel', done => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['Basel'];
    filteredMembers = filterCircles(filteredMembers, checkedCircles);
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      expect(filteredMembers.includes(user3)).toBe(true);
      done();
    }, 500);
  });

  test('filters for expected members in multiple cities', done => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['Zürich', 'Bern', 'Basel'];
    filteredMembers = filterCircles(filteredMembers, checkedCircles);
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(usersFromMockDB.length);
      done();
    }, 500);
  });

  test('filters for expected members in a non existant city', done => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['St. Gallen'];
    filteredMembers = filterCircles(filteredMembers, checkedCircles);
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(0);
      done();
    }, 500);
  });

  test('filters for expected members in a city already filtered by searchText', done => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['Bern'];
    filteredMembers = filterMembers(
      filterCircles(filteredMembers, checkedCircles),
      'Bruce'
    );
    setTimeout(() => {
      expect(filteredMembers.length).toEqual(1);
      expect(filteredMembers.includes(user1)).toBe(true);
      done();
    }, 500);
  });
});

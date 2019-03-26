import { filterMembers, filterByCircles } from './memberSearch';

const user1 = {
  _id: '1',
  firstname: 'Bruce',
  surname: 'Wayne',
  job: 'Banker',
  privateEmail: 'privateEmail',
  privateTel: 'privateTel',
  function: 'CEO',
  sector: 'Marketing',
  company: {
    _id: 'BW',
    companyName: 'Bruce Wayne Company'
  },
  circle: {
    _id: 'BE',
    name: 'Bern'
  }
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
  company: {
    _id: 'PP',
    companyName: 'PP Company'
  },
  circle: {
    _id: 'ZH',
    name: 'Zürich'
  }
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
  company: {
    _id: 'HV',
    companyName: 'Hansiverlag'
  },
  circle: {
    _id: 'BS',
    name: 'Basel'
  }
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
  company: {
    _id: 'BZ',
    companyName: 'Berner Zeitung'
  },
  circle: {
    _id: 'BE',
    name: 'Bern'
  }
};

const usersFromMockDB = [user1, user2, user3, user4];

describe('Test if the searchfilter filters the expected members', () => {
  test('search for firstname Peter', () => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'Peter');
    expect(filteredMembers.length).toEqual(2);
    expect(filteredMembers.includes(user2)).toBe(true);
    expect(filteredMembers.includes(user4)).toBe(true);
  });

  test('search for surname Parker', () => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'Parker');
    expect(filteredMembers.length).toEqual(1);
    expect(filteredMembers.includes(user4)).toBe(true);
  });

  test('search for job pilot', () => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'pilot');
    expect(filteredMembers.length).toEqual(1);
    expect(filteredMembers.includes(user2)).toBe(true);
  });

  test('search for sector marketing with 1 wrong char', () => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'mrketing');
    expect(filteredMembers.length).toEqual(1);
    expect(filteredMembers.includes(user1)).toBe(true);
  });

  test('search for sector marketing with 2 wrong chars', () => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'metketing');
    expect(filteredMembers.length).toEqual(0);
  });

  test('search for company Hansiverlag with uncompleted searchtext', () => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'Hansiverl');
    expect(filteredMembers.length).toEqual(1);
  });

  test('search for function Schreiber with uncompleted searchtext and 1 wrong char', () => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'schri');
    expect(filteredMembers.length).toEqual(1);
    expect(filteredMembers.includes(user3)).toBe(true);
  });

  test('searching with an empty searchtext', () => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, '');
    expect(filteredMembers.length).toEqual(usersFromMockDB.length);
  });

  test('searching for nonexistant entry', () => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'jihdshfhgfdhüqsq');
    expect(filteredMembers.length).toEqual(0);
  });

  test('checking if umlauts are ignored', () => {
    let filteredMembers = usersFromMockDB;
    filteredMembers = filterMembers(filteredMembers, 'goethe');
    expect(filteredMembers.length).toEqual(1);
    expect(filteredMembers.includes(user3)).toBe(true);
  });
});

describe('Test if the circle filter filters the expected members', () => {
  test('filters for expected members in Bern', () => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['BE'];
    filteredMembers = filterByCircles(filteredMembers, checkedCircles);
    expect(filteredMembers.length).toEqual(2);
    expect(filteredMembers.includes(user1)).toBe(true);
    expect(filteredMembers.includes(user4)).toBe(true);
  });

  test('filters for expected members in Zürich', () => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['ZH'];
    filteredMembers = filterByCircles(filteredMembers, checkedCircles);
    expect(filteredMembers.length).toEqual(1);
    expect(filteredMembers.includes(user2)).toBe(true);
  });

  test('filters for expected members in Basel', () => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['BS'];
    filteredMembers = filterByCircles(filteredMembers, checkedCircles);
    expect(filteredMembers.length).toEqual(1);
    expect(filteredMembers.includes(user3)).toBe(true);
  });

  test('filters for expected members in multiple cities', () => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['ZH', 'BE', 'BS'];
    filteredMembers = filterByCircles(filteredMembers, checkedCircles);
    expect(filteredMembers.length).toEqual(usersFromMockDB.length);
  });

  test('filters for expected members in a non existant city', () => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['SG'];
    filteredMembers = filterByCircles(filteredMembers, checkedCircles);
    expect(filteredMembers.length).toEqual(0);
  });

  test('filters for expected members in a city already filtered by searchText', () => {
    let filteredMembers = usersFromMockDB;
    let checkedCircles = ['BE'];
    filteredMembers = filterMembers(
      filterByCircles(filteredMembers, checkedCircles),
      'Bruce'
    );
    expect(filteredMembers.length).toEqual(1);
    expect(filteredMembers.includes(user1)).toBe(true);
  });
});

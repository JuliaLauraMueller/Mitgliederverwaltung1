import store from '../../helpers/store';
import * as actions from '../actions/memberActions';
import axios from 'axios';

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

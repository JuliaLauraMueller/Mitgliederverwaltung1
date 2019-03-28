import store from '../../helpers/store';
import * as actions from '../actions/memberActions';
import axios from 'axios';

jest.mock('axios');

describe('redux store member tests', () => {
  test('loads the expected number of members on fetch action', done => {
    let memberList = [{ _id: '1' }, { _id: '2' }, { _id: '3' }, { _id: '4' }];
    const resp = {
      data: memberList
    };
    axios.get.mockResolvedValue(resp);
    store.dispatch(actions.fetchMembers());

    setTimeout(() => {
      expect(store.getState().member.members.length).toEqual(memberList.length);
      done();
    }, 500);
  });
});

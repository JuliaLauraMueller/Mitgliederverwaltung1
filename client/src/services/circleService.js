import axios from 'axios';
import store from '../helpers/store';
import history from '../helpers/history';
import { alertError } from '..//redux/actions/alertActions';

async function getCircles() {
  return await axios.get('/circles/').then(resp => {
    let response = resp.data;

    let mem = {
      circles: response.map(element => {
        return {
          _id: element.id,
          name: element.name
        };
      })
    };
    return mem;
  });
}

async function deleteCircle(id) {
  return await axios
    .delete('/circles/' + id)
    .then(resp => {
      return id;
    })
    .catch(err => {
      history.push('/admin');
      store.dispatch(
        alertError(
          'City konnte nicht gelöscht werden. Cities mit Mitgliedern können nicht gelöscht werden.'
        )
      );
    });
}

const memberService = { getCircles, deleteCircle };
export default memberService;

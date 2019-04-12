import axios from 'axios';
import store from '../helpers/store';
import history from '../helpers/history';
import { alertError } from '../redux/actions/alertActions';

async function getEventBody() {
  return await axios
    .get('/events/')
    .then(resp => {
      return { events: resp.data };
    })
    .catch(err => {
      // couldn't load members
      history.push('/');
      store.dispatch(alertError('Events konnten nicht geladen werden.'));
    });
}

async function deleteEvent(id) {
  return await axios
    .delete('/events/' + id)
    .then(resp => {
      return id;
    })
    .catch(err => {
      store.dispatch(alertError('Event konnte nicht gelöscht werden.'));
    });
}

async function createEvent(data) {
  return await axios
    .post('/events/', data)
    .then(res => {
      return res;
    })
    .catch(err => {
      if (
        err &&
        err.data &&
        err.data.error &&
        err.data.error.type === 'invalid_input'
      ) {
        return Promise.reject(err.data.error.errors);
      }
    });
}

async function setEventData(data) {
  return await axios
    .put('/events/' + data._id, data)
    .then(res => {
      return res;
    })
    .catch(err => {
      if (err && err.data.error && err.data.error.type === 'invalid_input') {
        return Promise.reject(err.data.error.errors);
      }
    });
}

export default { getEventBody, deleteEvent, createEvent, setEventData };

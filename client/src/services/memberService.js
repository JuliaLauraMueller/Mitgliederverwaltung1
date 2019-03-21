import axios from 'axios';
import store from '../helpers/store';
import history from '../helpers/history';
import { alertError } from '..//redux/actions/alertActions';

async function getUserBody() {
  return await axios
    .get('/users/')
    .then(resp => {
      let users = resp.data;

      let mem = {
        members: users.map(element => {
          return {
            _id: element._id,
            memberNumber: element.memberNumber,
            firstname: element.firstname,
            surname: element.surname,
            privateEmail: element.privateEmail,
            privateTel: element.privateTel,
            job: element.job,
            function: element.function,
            sector: element.sector,
            company:
              element.companyValues.length > 0
                ? element.companyValues[0]
                : undefined,
            circle:
              element.circleValues.length > 0
                ? element.circleValues[0]
                : undefined,
            profilepic: './img/marc_zimmermann.jpg' // TODO: implement loading of images
          };
        })
      };
      return mem;
    })
    .catch(err => {
      // couldn't load members
      history.push('/');
      store.dispatch(alertError('Mitglieder konnten nicht geladen werden.'));
    });
}

async function deleteMember(id) {
  return await axios
    .delete('/users/' + id)
    .then(resp => {
      return id;
    })
    .catch(err => {
      history.push('/admin');
      store.dispatch(alertError('Mitglied konnte nicht gelöscht werden.'));
    });
}

async function createMember(data) {
  return await axios
    .post('/users/', data)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      if (err && err.data.error && err.data.error.type == 'invalid_input') {
        return Promise.reject(err.data.error.errors);
      }
    });
}

const memberService = { getUserBody, deleteMember, createMember };
export default memberService;

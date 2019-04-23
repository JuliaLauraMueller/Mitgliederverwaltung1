import axios from 'axios';
import store from '../helpers/store';
import history from '../helpers/history';
import { alertError, alertSuccess } from '..//redux/actions/alertActions';

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
            role: element.role,
            company:
              element.companyValues && element.companyValues.length > 0
                ? element.companyValues[0]
                : undefined,
            circle:
              element.circleValues && element.circleValues.length > 0
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

async function changeRole(member) {
  return await axios
    .put('/users/changeRole/' + member._id, member)
    .then(res => {
      store.dispatch(alertSuccess('Rolle wurde geändert.'));
      return res;
    })
    .catch(err => {
      history.push('/admin');
      store.dispatch(alertError('Rolle konnte nicht geändert werden.'));
    });
}

const memberService = { getUserBody, deleteMember, createMember, changeRole };
export default memberService;

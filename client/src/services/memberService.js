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
            _id: element.id,
            firstname: element.firstname,
            surname: element.surname,
            privateEmail: element.privateEmail,
            privateTel: element.privateTel,
            job: element.job,
            function: element.function,
            sector: element.sector,
            company: element.company,
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

const memberService = { getUserBody };
export default memberService;

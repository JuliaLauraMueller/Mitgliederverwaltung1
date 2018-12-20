import axios from 'axios';

function getUserBody() {
  var users;

  return axios.get('/users/').then(resp => {
    users = resp.data;

    let mem = {
      members: users.map(element => {
        return {
          firstname: element.firstname,
          surname: element.surname,
          privateEmail: element.privateEmail,
          privateTel: element.privateTel,
          profilepic: './img/marc_zimmermann.jpg'
        };
      })
    };
    return mem;
  });
}

const memberService = { getUserBody };
export default memberService;

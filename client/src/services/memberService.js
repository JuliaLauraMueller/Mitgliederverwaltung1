import axios from 'axios';

function getUserBody() {
  var users;

  return axios.get('/users/').then(resp => {
    users = resp.data;

    let mem = {
      members: users.map(element => {
        return {
          _id: element.id,
          firstname: element.firstname,
          surname: element.surname,
          privateEmail: element.privateEmail,
          privateTel: element.privateTel,
          profilepic: './img/marc_zimmermann.jpg' // TODO: implement loading of images
        };
      })
    };
    console.log(mem);
    return mem;
  });
}

const memberService = { getUserBody };
export default memberService;

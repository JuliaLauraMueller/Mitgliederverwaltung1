import axios from 'axios';

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
    .catch(err => console.log(err)); // TODO (Beni): error handling
}

const memberService = { getUserBody };
export default memberService;

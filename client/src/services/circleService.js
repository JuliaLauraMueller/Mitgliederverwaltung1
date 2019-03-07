import axios from 'axios';

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

const memberService = { getCircles };
export default memberService;

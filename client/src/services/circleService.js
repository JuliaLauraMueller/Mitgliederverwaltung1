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

async function setCircleData(data) {
  return await axios.put('/circles/' + data._id, data).then(res => {
    return res;
  });
}

const memberService = { getCircles, setCircleData };
export default memberService;

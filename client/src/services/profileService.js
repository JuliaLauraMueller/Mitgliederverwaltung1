import axios from 'axios';

function getUserData() {
  console.log('get');
  return axios
    .get('/users/current')
    .then(resp => {
      return resp.data;
    })
    .catch(err => {});
}

function getCompanyData(id) {
  return axios
    .get('/companies/:id', { id })
    .then(resp => {
      return resp.data;
    })
    .catch(err => {});
}

function getCompanyLocationData(id) {
  return axios
    .get('/companyLocations/:id', { id })
    .then(resp => {
      return resp.data;
    })
    .catch(err => {});
}

const profileService = { getUserData, getCompanyData, getCompanyLocationData };
export default profileService;

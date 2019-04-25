import axios from 'axios';

function login(privateEmail, password) {
  return axios.post('/users/auth', { privateEmail, password }).then(resp => {
    const user = resp.data;
    if (user) {
      localStorage.setItem('user', user);
    }
    return user;
  });
}

function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('userData');
}

function getUserData(id) {
  return axios.get('/users/' + id).then(resp => {
    var userData = {
      firstname: resp.data.firstname,
      surname: resp.data.surname,
      avatar: resp.data.avatar,
      avatarTag: resp.data.avatarTag
    };
    if (userData) {
      localStorage.setItem('userData', userData);
    }
    return userData;
  });
}

const authService = { login, logout, getUserData };
export default authService;

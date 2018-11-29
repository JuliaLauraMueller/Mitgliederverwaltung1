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
}

const authService = { login, logout };
export default authService;

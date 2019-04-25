import jwtDecode from 'jwt-decode';

export default function getUserToken() {
  const userToken = localStorage.getItem('user');
  return userToken ? jwtDecode(userToken) : undefined;
}

import jwtDecode from 'jwt-decode';

const userToken = localStorage.getItem('user');
export default (userToken ? jwtDecode(userToken) : undefined);

import jwtDecode from "jwt-decode";

const userToken = localStorage.getItem("user");
console.log(jwtDecode(userToken));
export default (userToken ? jwtDecode(userToken) : undefined);

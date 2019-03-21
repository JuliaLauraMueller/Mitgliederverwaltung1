module.exports = {
  personalAccessCheck,
  roleAccessCheck
};

function personalAccessCheck(userId, accessedUserId) {
  return userId === accessedUserId;
}

function roleAccessCheck(requiredRole, requiredCircle, userRole, userCircle) {
  if (
    userRole == 5 ||
    (userRole >= requiredRole && requiredCircle == userCircle)
  ) {
    return true;
  }
  return false;
}

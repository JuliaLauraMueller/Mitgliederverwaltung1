module.exports = {
  personalAccessCheck,
  roleAccessCheck,
  isFederationAdmin
};

function isFederationAdmin(role) {
  return role === 5;
}

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

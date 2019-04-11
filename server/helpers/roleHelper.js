module.exports = {
  personalAccessCheck,
  roleAccessCheck,
  isFederationAdmin,
  roleAccessCheckMultipleCircles
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

function roleAccessCheckMultipleCircles(
  requiredRole,
  givenCircles,
  userRole,
  userCircle
) {
  return (
    userRole == 5 ||
    (userRole >= requiredRole &&
      givenCircles &&
      givenCircles.includes(userCircle))
  );
}

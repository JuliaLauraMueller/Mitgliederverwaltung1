module.exports = {
  personalAccessCheck,
  roleAccessCheck,
  isFederationAdmin,
  roleAccessCheckMultipleCircles,
  roleEventAccessCheckPermittedRoles
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
  let containsUserCircle = false;
  for (let c of givenCircles) {
    // loose equality comparison instead of strict equality comparison
    containsUserCircle = containsUserCircle || userCircle == c;
  }
  return (
    userRole == 5 ||
    (userRole >= requiredRole && givenCircles && containsUserCircle)
  );
}

function roleEventAccessCheckPermittedRoles(permittedEventRoles, userRole) {
  return (
    userRole == 5 ||
    (permittedEventRoles && permittedEventRoles.includes(userRole))
  );
}

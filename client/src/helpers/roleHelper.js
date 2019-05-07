module.exports = {
  personalAccessCheck,
  roleAccessCheck,
  isFederationAdmin,
  roleToString
};

function isFederationAdmin(role) {
  return role === 5;
}

function personalAccessCheck(userId, accessedUserId) {
  return userId === accessedUserId;
}

function roleAccessCheck(requiredRole, requiredCircle, userRole, userCircle) {
  if (
    userRole === 5 ||
    (userRole >= requiredRole && requiredCircle === userCircle)
  ) {
    return true;
  }
  return false;
}

function roleToString(role) {
  let roleText = 'Mitglied';
  switch (role) {
    case 1:
      roleText = 'Newsadministrator';
      break;
    case 2:
      roleText = 'Eventadministrator';
      break;
    case 3:
      roleText = 'Personaladministrator';
      break;
    case 4:
      roleText = 'Cityadministrator';
      break;
    case 5:
      roleText = 'Federationsadministrator';
      break;
  }
  return roleText;
}

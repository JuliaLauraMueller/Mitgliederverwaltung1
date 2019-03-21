const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const roleService = require('../services/roleService');

// routes
router.post('/auth', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then(user => {
      return user ? res.json(user) : res.sendStatus(401, 'Unauthorized');
    })
    .catch(err => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  userService.getCircleForId(req.body._id).then(result => {
    console.log(
      '--------------------------------------------------------------'
    );
    console.log('Users:');
    console.log('Request: ' + req.body._id);
    console.log('JWT: ' + req.user._id);

    console.log('Circles:');
    console.log('Request: ' + result.circle);
    console.log('JWT: ' + req.user.circle);
  });

  if (
    !roleService.roleAccessCheck(
      3,
      userService.getCircleForId(req.params.id),
      req.user.role,
      req.user.circle
    ) &&
    !roleService.personalAccessCheck(req.params.id, req.user._id)
  ) {
    console.log("Shouldn't hit this...");
    res.status(403).render();
  }

  userService
    .updateUser(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}

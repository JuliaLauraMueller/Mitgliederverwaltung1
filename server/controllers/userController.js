const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const roleHelper = require('../helpers/roleHelper');
const errorHandler = require('../helpers/errorHandler');

// routes
router.post('/auth', authenticate);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', deleteUser);
router.post('/', create);
router.put('/changeRole/:id', changeRole);

module.exports = router;

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then(user => {
      return user ? res.json(user) : res.sendStatus(401, 'Unauthorized');
    })
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
  userService
    .getCircleForId(req.body._id)
    .then(circle => {
      if (
        roleHelper.roleAccessCheck(3, circle, req.user.role, req.user.circle) ||
        roleHelper.personalAccessCheck(req.params.id, req.user._id)
      ) {
        userService
          .updateUser(req.params.id, req.body)
          .then(() => res.json({}))
          .catch(err => next(err));
      } else {
        res.sendStatus(403);
      }
    })
    .catch(err => {
      res.sendStatus(404);
    });
}

function deleteUser(req, res, next) {
  userService
    .getCircleForId(req.body._id)
    .then(circle => {
      if (
        roleHelper.roleAccessCheck(3, circle, req.user.role, req.user.circle)
      ) {
        userService
          .delete(req.params.id)
          .then(() => res.json({}))
          .catch(err => next(err));
      } else {
        res.sendStatus(403);
      }
    })
    .catch(err => {
      res.sendStatus(404);
    });
}

function create(req, res, next) {
  userService
    .getCircleForId(req.user._id)
    .then(circle => {
      if (
        roleHelper.roleAccessCheck(3, circle, req.user.role, req.user.circle)
      ) {
        userService
          .create(req.body)
          .then(user => {
            return res.json({ created: user });
          })
          .catch(error => {
            if (error && error.type == 'invalid_input') {
              res.status(422).send({ error });
            } else {
              console.error('User create error: ', error);
              res.sendStatus(500);
            }
          });
      }
    })
    .catch(err => {
      res.sendStatus(404);
    });
}

function changeRole(req, res, next) {
  userService
    .getCircleForId(req.body._id)
    .then(circle => {
      if (
        roleHelper.roleAccessCheck(4, circle, req.user.role, req.user.circle)
      ) {
        userService
          .changeRole(req.body._id, req.body.role)
          .then(() => res.json({}))
          .catch(err => next(err));
      } else {
        res.sendStatus(403);
      }
    })
    .catch(err => {
      res.sendStatus(404);
    });
}

const express = require('express');
const router = express.Router();
const circleService = require('../services/circleService');
const roleHelper = require('../helpers/roleHelper');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', deleteCircle);
router.post('/', create);

module.exports = router;

function getAll(req, res, next) {
  circleService
    .getAll()
    .then(circles => res.json(circles))
    .catch(err => next(err));
}

function getById(req, res, next) {
  circleService
    .getById(req.params.id)
    .then(circle => (circle ? res.json(circle) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  if (roleHelper.isFederationAdmin(req.user.role)) {
    circleService
      .updateCircle(req.params.id, req.body)
      .then(() => res.json({}))
      .catch(error => {
        if (error && error.type == 'invalid_input') {
          res.status(422).send({ error });
        } else {
          console.error('Circle create error: ', error);
          res.sendStatus(500);
        }
      });
  } else {
    res.sendStatus(403);
  }
}

function deleteCircle(req, res, next) {
  if (roleHelper.isFederationAdmin(req.user.role)) {
    circleService
      .deleteCircle(req.params.id)
      .then(() => res.json({}))
      .catch(error => {
        if (error && error.type == 'users_remaining_in_circle') {
          res.status(422).send(error);
        } else {
          console.error('Circle delete error: ', error);
          res.sendStatus(500);
        }
      });
  } else {
    res.sendStatus(403);
  }
}

function create(req, res, next) {
  if (roleHelper.isFederationAdmin(req.user.role)) {
    circleService
      .create(req.body)
      .then(circle => {
        return res.json({ created: circle });
      })
      .catch(error => {
        if (error && error.type == 'invalid_input') {
          res.status(422).send({ error });
        } else {
          console.error('Circle create error: ', error);
          res.sendStatus(500);
        }
      });
  } else {
    res.sendStatus(403);
  }
}

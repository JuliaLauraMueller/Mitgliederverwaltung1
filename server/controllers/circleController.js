const express = require('express');
const router = express.Router();
const circleService = require('../services/circleService');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', deleteCircle);

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
  circleService
    .updateCircle(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function deleteCircle(req, res, next) {
  circleService
    .deleteCircle(req.params.id)
    .then(() => res.json({}))
    .catch(err => res.status(500).send(err));
}

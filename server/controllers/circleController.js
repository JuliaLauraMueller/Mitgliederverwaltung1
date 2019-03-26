const express = require('express');
const router = express.Router();
const circleService = require('../services/circleService');
const roleHelper = require('../helpers/roleHelper');

// routes
router.get('/', getAll);
router.get('/:id', getById);

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

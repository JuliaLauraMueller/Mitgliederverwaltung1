const express = require('express');
const router = express.Router();
const circleService = require('../services/circleService');

// routes
router.get('/:id', getById);

module.exports = router;

function getById(req, res, next) {
  circleService
    .getById(req.params.id)
    .then(circle => (circle ? res.json(circle) : res.sendStatus(404)))
    .catch(err => next(err));
}

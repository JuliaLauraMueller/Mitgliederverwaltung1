const express = require('express');
const router = express.Router();
const companyLocationService = require('../services/companyLocationService');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
//router.post('/', _create);

module.exports = router;

function getAll(req, res, next) {
  companyLocationService
    .getAll()
    .then(companyLocations => res.json(companyLocations))
    .catch(err => next(err));
}

function getById(req, res, next) {
  companyLocationService
    .getById(req.params.id)
    .then(companyLocation =>
      companyLocation ? res.json(companyLocation) : res.sendStatus(404)
    )
    .catch(err => next(err));
}

function update(req, res, next) {
  companyLocationService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  companyLocationService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}

/*
function _create(req, res, next) {
  companyLocationService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}
*/

const express = require('express');
const router = express.Router();
const companyService = require('../services/companyService');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
  companyService
    .getAll()
    .then(companies => res.json(companies))
    .catch(err => next(err));
}

function getById(req, res, next) {
  companyService
    .getById(req.params.id)
    .then(company => (company ? res.json(company) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  companyService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  companyService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}

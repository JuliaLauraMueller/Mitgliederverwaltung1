const express = require('express');
const router = express.Router();
const eventService = require('../services/eventService');
const roleHelper = require('../helpers/roleHelper');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', deleteEvent);
router.post('/', create);

module.exports = router;

function getAll(req, res, next) {
  eventService
    .getAll()
    .then(events => res.json(events))
    .catch(err => next(err));
}

function getById(req, res, next) {
  eventService
    .getById(req.params.id)
    .then(event => (event ? res.json(event) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  eventService
    .getCirclesForId(req.params.id)
    .then(circles => {
      console.log(circles);
      if (
        roleHelper.roleAccessCheckMultipleCircles(
          2,
          circles,
          req.user.role,
          req.user.circle
        )
      ) {
        eventService
          .updateEvent(req.params.id, req.body)
          .then(event => {
            return res.json({ updated: event });
          })
          .catch(error => {
            if (error && error.type == 'invalid_input') {
              res.status(422).send(error);
            } else {
              console.error('Event update error: ', error);
              res.sendStatus(500);
            }
          });
      } else {
        res.sendStatus(403);
      }
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(404);
    });
}

function deleteEvent(req, res, next) {
  eventService
    .getCirclesForId(req.params.id)
    .then(circles => {
      if (
        roleHelper.roleAccessCheckMultipleCircles(
          2,
          circles,
          req.user.role,
          req.user.circle
        )
      ) {
        eventService
          .deleteEvent(req.params.id)
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

async function create(req, res, next) {
  if (req.user.role >= 2) {
    eventService
      .create(req.body)
      .then(event => {
        return res.json({ created: event });
      })
      .catch(error => {
        if (error && error.type == 'invalid_input') {
          res.status(422).send({ error });
        } else {
          console.error('Event create error: ', error);
          res.sendStatus(500);
        }
      });
  } else {
    res.sendStatus(403);
  }
}

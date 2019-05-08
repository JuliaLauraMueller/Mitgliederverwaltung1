const express = require('express');
const router = express.Router();
const newsArticleService = require('../services/newsArticleService');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', deleteNewsArticle);
router.post('/', create);

module.exports = router;

function getAll(req, res, next) {
  newsArticleService
    .getAll()
    .then(newsArticles => {
      res.json(newsArticles);
    })
    .catch(err => next(err));
}

function getById(req, res, next) {
  newsArticleService
    .getById(req.params.id)
    .then(newsArticle => {
      if (newsArticle) {
        res.json(newsArticle);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => next(err));
}

function update(req, res, next) {
  if (req.user.role >= 1) {
    newsArticleService
      .updateNewsArticle(req.params.id, req.body)
      .then(newsArticle => {
        return res.json({ updated: newsArticle });
      })
      .catch(error => {
        if (error && error.type == 'invalid_input') {
          res.status(422).send({ error });
        } else {
          console.error('NewsArticle update error: ', error);
          res.sendStatus(500);
        }
      });
  } else {
    res.sendStatus(403);
  }
}

function deleteNewsArticle(req, res, next) {
  if (req.user.role >= 1) {
    newsArticleService
      .deleteNewsArticle(req.params.id)
      .then(() => res.json({}))
      .catch(err => next(err));
  } else {
    res.sendStatus(403);
  }
}

async function create(req, res, next) {
  if (req.user.role >= 1) {
    newsArticleService
      .create(req.body)
      .then(newsArticle => {
        return res.json({ created: newsArticle });
      })
      .catch(error => {
        if (error && error.type == 'invalid_input') {
          res.status(422).send({ error });
        } else {
          console.error('NewsArticle create error: ', error);
          res.sendStatus(500);
        }
      });
  } else {
    res.sendStatus(403);
  }
}

jest.mock('../models/NewsArticleModel');

const {
  updateNewsArticle,
  create,
  deleteNewsArticle
} = require('./newsArticleService');
const { findById, aggregate } = require('../models/NewsArticleModel');

test('update newsArticle should return updated newsArticle', async () => {
  await updateNewsArticle('0', {
    title: 'Test NewsArticle updated',
    article: 'updated article',
    date: new Date('05/18/2018'),
    author: 'a2'
  })
    .then(() => {
      return findById('0');
    })
    .then(resp => {
      var newsArticle = resp;
      expect(newsArticle.title).toEqual('Test NewsArticle updated');
      expect(newsArticle.article).toEqual('updated article');
      expect(newsArticle.date.getTime() == new Date('05/18/2018').getTime());
      expect(newsArticle.author).toEqual('a2');
    });
});

test('update should throw an error when title is missing', async () => {
  let errorReceived = false;
  try {
    await updateNewsArticle('0', {
      article: 'updated description',
      date: new Date('05/11/2018'),
      author: 'a2'
    });
  } catch (e) {
    if (e && e.type == 'invalid_input') {
      errorReceived = true;
    }
  }

  expect(errorReceived).toBe(true);
});

test('update should throw an error when article is missing', async () => {
  let errorReceived = false;
  try {
    await updateNewsArticle('0', {
      title: 'updated title',
      date: new Date('05/11/2018'),
      author: 'a2'
    });
  } catch (e) {
    if (e && e.type == 'invalid_input') {
      errorReceived = true;
    }
  }

  expect(errorReceived).toBe(true);
});

test('delete newsArticle should decrease the amount of newsArticles', async () => {
  let amountBefore = (await aggregate()).length;
  await deleteNewsArticle('BBBBBBBBBBBBBBBBBBBBBBBB');

  let amountAfter = (await aggregate()).length;
  expect(amountAfter).toBe(amountBefore - 1);
});

test('create should throw an error when title is missing', async () => {
  let errorReceived = false;
  try {
    await create({});
  } catch (e) {
    if (e && e.type == 'invalid_input') {
      errorReceived = true;
    }
  }

  expect(errorReceived).toBe(true);
});

test('create should add an newsArticle when values are valid', async () => {
  let newsArticleAmountBefore = (await aggregate()).length;
  let newNewsArticle = {
    title: 'TestNewsArticle',
    article: 'test article',
    date: new Date('03/05/2019'),
    author: 'a3'
  };
  await create(newNewsArticle);

  let newsArticleAmountAfter = (await aggregate()).length;
  expect(newsArticleAmountAfter).toBe(newsArticleAmountBefore + 1);
});

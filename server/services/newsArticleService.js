const db = require('../helpers/db');
const NewsArticle = db.NewsArticle;

module.exports = {
  getById,
  getAll,
  updateNewsArticle,
  deleteNewsArticle,
  create
};

async function getById(id) {
  return await NewsArticle.findById(id).select();
}

async function getAll() {
  return await NewsArticle.aggregate([
    {
      $project: {
        _id: '$_id',
        title: '$title',
        article: '$article',
        author: '$author',
        date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }
      }
    }
  ]).exec();
}

async function updateNewsArticle(id, newsArticleParam) {
  const newsArticle = await NewsArticle.findById(id);
  if (!newsArticle) throw 'NewsArticle not found';

  let errors = validate(newsArticleParam);
  if (errors.length != 0) {
    throw { type: 'invalid_input', errors };
  }

  await NewsArticle.updateOne({ _id: id }, newsArticleParam);
}

async function deleteNewsArticle(id) {
  let newsArticle = await getById(id);
  if (newsArticle) {
    await NewsArticle.findByIdAndRemove(id);
  }
}

async function create(newsArticleParam) {
  let errors = validate(newsArticleParam);
  if (errors.length != 0) {
    throw { type: 'invalid_input', errors };
  }

  try {
    return await NewsArticle.create(newsArticleParam);
  } catch (error) {
    throw { type: 'processing_error', error };
  }
}

function validate(newsArticleParam) {
  let errorMessages = [];
  if (!newsArticleParam.title || newsArticleParam.title.length == 0) {
    errorMessages.push('Titel darf nicht leer sein.');
  } else if (newsArticleParam.title.length > 30) {
    errorMessages.push('Titel muss kürzer als 30 Zeichen sein.');
  }
  if (!newsArticleParam.article || newsArticleParam.article.length == 0) {
    errorMessages.push('Inhalt darf nicht leer sein.');
  } else if (newsArticleParam.article.length > 1000) {
    errorMessages.push('Inhalt muss kürzer als 1000 Zeichen sein.');
  }
  if (Date.parse(newsArticleParam.date) > new Date()) {
    errorMessages.push('Datum darf nicht in der Zukunft liegen.');
  }
  if (!Date.parse(newsArticleParam.date)) {
    errorMessages.push('Kein gültiges Datum (Empfohlenes Format: YYYY-DD-MM)');
  }
  return errorMessages;
}

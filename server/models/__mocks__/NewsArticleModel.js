module.exports = {
  findById,
  updateOne,
  aggregate,
  create,
  findByIdAndRemove,
  updateMany
};

let newsArticles = [
  {
    id: '0',
    title: 'TestNewsArticle',
    article: 'Description of test news article.',
    date: new Date('07/25/2018'),
    author: 'a1',
    save() {},
    populate(field) {
      return this;
    },
    select(arg) {
      return this;
    }
  },
  {
    id: 'BBBBBBBBBBBBBBBBBBBBBBBB',
    title: 'Second News article',
    article: 'Desc.',
    date: new Date('07/25/2018'),
    author: 'a2',
    save() {},
    populate(field) {
      return this;
    },
    select(arg) {
      return this;
    }
  }
];

function findById(id) {
  var result = newsArticles.find(newsArticle => newsArticle.id == id);
  if (result == undefined) {
    return null;
  }

  return result;
}

async function updateOne(idObject, param) {
  var result = await findById(idObject._id);
  result.title = param.title;
  result.article = param.article;
  result.date = param.date;
  result.author = param.author;
}

async function updateMany({}) {}

async function aggregate(args) {
  return newsArticles;
}

async function create(newsArticle) {
  newsArticle._id = 'newNewsArticle';
  newsArticles.push(newsArticle);
  return newsArticle;
}

async function findByIdAndRemove(id) {
  newsArticles = newsArticles.filter(newsArticle => {
    return newsArticle.id != id;
  });
}

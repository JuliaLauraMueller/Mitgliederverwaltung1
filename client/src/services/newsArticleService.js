import axios from 'axios';
import store from '../helpers/store';
import history from '../helpers/history';
import { alertError } from '../redux/actions/alertActions';

async function getNewsArticleBody() {
  return await axios
    .get('/newsArticles/')
    .then(resp => {
      return { newsArticles: resp.data };
    })
    .catch(err => {
      // couldn't load members
      history.push('/');
      store.dispatch(alertError('News konnten nicht geladen werden.'));
    });
}

async function deleteNewsArticle(id) {
  return await axios
    .delete('/newsArticles/' + id)
    .then(resp => {
      return id;
    })
    .catch(err => {
      store.dispatch(alertError('NewsArticle konnte nicht gelöscht werden.'));
    });
}

async function createNewsArticle(data) {
  return await axios
    .post('/newsArticles/', data)
    .then(res => {
      return res;
    })
    .catch(err => {
      if (
        err &&
        err.data &&
        err.data.error &&
        err.data.error.type === 'invalid_input'
      ) {
        return Promise.reject(err.data.error.errors);
      }
    });
}

async function getNewsArticleData(id) {
  return await axios.get('/newsArticles/' + id).then(resp => {
    return {
      newsArticle: {
        _id: id,
        title: resp.data.title,
        article: resp.data.article,
        author: resp.data.author,
        date: resp.data.date
      }
    };
  });
}

async function setNewsArticleData(data) {
  return await axios
    .put('/newsArticles/' + data._id, data)
    .then(res => {
      return res;
    })
    .catch(err => {
      if (err && err.data.error && err.data.error.type === 'invalid_input') {
        return Promise.reject(err.data.error.errors);
      }
    });
}

export default {
  getNewsArticleBody,
  deleteNewsArticle,
  createNewsArticle,
  setNewsArticleData,
  getNewsArticleData
};

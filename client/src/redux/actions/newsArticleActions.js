import {
  NEWS_ARTICLE_FETCHED,
  NEWS_ARTICLE_DELETED,
  CREATE_NEWS_ARTICLE,
  NEWS_ARTICLES_FETCHED,
  PUT_NEWS_ARTICLE,
  SEARCH_NEWS_ARTICLES
} from '../types/newsArticleTypes';
import newsArticleService from '../../services/newsArticleService';
import store from '../../helpers/store';
import history from '../../helpers/history';
import { alertError } from './alertActions';

export const searchNewsArticles = searchText => dispatch => {
  dispatch({
    type: SEARCH_NEWS_ARTICLES,
    payload: { searchText }
  });
};

export const fetchNewsArticle = id => dispatch => {
  newsArticleService
    .getNewsArticleData(id)
    .then(res => {
      if (res) {
        dispatch({ type: NEWS_ARTICLE_FETCHED, payload: res.newsArticle });
      }
    })
    .catch(err => {
      // couldn't load news article
      history.push('/');
      store.dispatch(alertError('NewsArticle konnte nicht geladen werden.'));
    });
};

export const fetchNewsArticles = () => dispatch => {
  newsArticleService.getNewsArticleBody().then(res => {
    if (res) {
      dispatch({ type: NEWS_ARTICLES_FETCHED, payload: res.newsArticles });
    }
  });
};

export const deleteNewsArticle = id => dispatch => {
  newsArticleService.deleteNewsArticle(id).then(res => {
    if (res) {
      dispatch({ type: NEWS_ARTICLE_DELETED, payload: res });
    }
  });
};

export const createNewsArticle = newsArticleData => async dispatch => {
  return await newsArticleService
    .createNewsArticle(newsArticleData)
    .then(res => {
      if (res && res.data.created) {
        dispatch({ type: CREATE_NEWS_ARTICLE, payload: res.data.created });
      }
    })
    .catch(errorMessage => {
      return Promise.reject(errorMessage);
    });
};

export const putNewsArticle = newsArticleData => async dispatch => {
  return newsArticleService
    .setNewsArticleData(newsArticleData)
    .then(res => {
      if (res) {
        dispatch({ type: PUT_NEWS_ARTICLE, payload: newsArticleData });
      }
    })
    .catch(errorMessage => {
      return Promise.reject(errorMessage);
    });
};

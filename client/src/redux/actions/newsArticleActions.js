import {
  NEWS_ARTICLE_FETCHED,
  NEWS_ARTICLE_DELETED,
  CREATE_NEWS_ARTICLE,
  NEWS_ARTICLES_FETCHED,
  PUT_NEWS_ARTICLE,
  SEARCH_NEWS_ARTICLES
} from '../types/newsArticleTypes';

import { DATA_NEWS_FETCHING, DATA_NEWS_FETCHED } from '../types/loadingTypes';
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
  dispatch({ type: DATA_NEWS_FETCHING });
  newsArticleService
    .getNewsArticleData(id)
    .then(res => {
      if (res) {
        dispatch({ type: NEWS_ARTICLE_FETCHED, payload: res.newsArticle });
      }
      dispatch({ type: DATA_NEWS_FETCHED });
    })
    .catch(err => {
      // couldn't load news article
      dispatch({ type: DATA_NEWS_FETCHED });
      history.push('/');
      store.dispatch(alertError('NewsArticle konnte nicht geladen werden.'));
    });
};

export const fetchNewsArticles = () => dispatch => {
  dispatch({ type: DATA_NEWS_FETCHING });
  newsArticleService.getNewsArticleBody().then(res => {
    if (res) {
      dispatch({ type: NEWS_ARTICLES_FETCHED, payload: res.newsArticles });
    }
    dispatch({ type: DATA_NEWS_FETCHED });
  });
};

export const deleteNewsArticle = id => dispatch => {
  dispatch({ type: DATA_NEWS_FETCHING });
  newsArticleService.deleteNewsArticle(id).then(res => {
    if (res) {
      dispatch({ type: NEWS_ARTICLE_DELETED, payload: res });
    }
    dispatch({ type: DATA_NEWS_FETCHED });
  });
};

export const createNewsArticle = newsArticleData => async dispatch => {
  dispatch({ type: DATA_NEWS_FETCHING });
  return await newsArticleService
    .createNewsArticle(newsArticleData)
    .then(res => {
      if (res && res.data.created) {
        dispatch({ type: CREATE_NEWS_ARTICLE, payload: res.data.created });
      }
      dispatch({ type: DATA_NEWS_FETCHED });
    })
    .catch(errorMessage => {
      dispatch({ type: DATA_NEWS_FETCHED });
      return Promise.reject(errorMessage);
    });
};

export const putNewsArticle = newsArticleData => async dispatch => {
  dispatch({ type: DATA_NEWS_FETCHING });
  return newsArticleService
    .setNewsArticleData(newsArticleData)
    .then(res => {
      if (res) {
        dispatch({ type: PUT_NEWS_ARTICLE, payload: newsArticleData });
      }
      dispatch({ type: DATA_NEWS_FETCHED });
    })
    .catch(errorMessage => {
      dispatch({ type: DATA_NEWS_FETCHED });
      return Promise.reject(errorMessage);
    });
};

import {
  SEARCH_NEWS_ARTICLES,
  NEWS_ARTICLE_FETCHED,
  NEWS_ARTICLE_DELETED,
  CREATE_NEWS_ARTICLE,
  NEWS_ARTICLES_FETCHED,
  PUT_NEWS_ARTICLE
} from '../types/newsArticleTypes';
import { filterNewsArticles } from '../../helpers/newsArticleSearch';

const initialState = {
  newsArticles: [],
  filteredNewsArticles: [],
  fetchedNewsArticle: {}
};

function getUpdatedNewsArticles(newsArticles, updatedNewsArticle) {
  let index = newsArticles.findIndex(
    newsArticle => newsArticle._id === updatedNewsArticle._id
  );
  newsArticles[index].title = updatedNewsArticle.title;
  newsArticles[index].article = updatedNewsArticle.article;
  newsArticles[index].author = updatedNewsArticle.author;
  newsArticles[index].date = updatedNewsArticle.date;
  return newsArticles;
}

function deleteNewsArticle(newsArticles, id) {
  return newsArticles.filter(newsArticle => {
    return newsArticle._id !== id;
  });
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_NEWS_ARTICLES:
      return {
        newsArticles: state.newsArticles,
        searchText: action.payload,
        fetchedNewsArticle: state.fetchedNewsArticle,
        filteredNewsArticles: filterNewsArticles(
          state.newsArticles,
          action.payload.searchText
        )
      };
    case NEWS_ARTICLE_FETCHED:
      return {
        newsArticles: state.newsArticles,
        filteredNewsArticles: state.filteredNewsArticles,
        fetchedNewsArticle: action.payload
      };
    case NEWS_ARTICLES_FETCHED:
      return {
        newsArticles: [...action.payload],
        filteredNewsArticles: filterNewsArticles(action.payload, ''),
        fetchedNewsArticle: state.fetchedNewsArticle
      };
    case NEWS_ARTICLE_DELETED:
      return {
        newsArticles: deleteNewsArticle(state.newsArticles, action.payload),
        filteredNewsArticles: state.filteredNewsArticles,
        fetchedNewsArticle: state.fetchedNewsArticle
      };
    case CREATE_NEWS_ARTICLE:
      return {
        newsArticles: [...state.newsArticles, action.payload],
        filteredNewsArticles: state.filteredNewsArticles,
        fetchedNewsArticle: state.fetchedNewsArticle
      };
    case PUT_NEWS_ARTICLE:
      return {
        newsArticles: [
          ...getUpdatedNewsArticles(state.newsArticles, action.payload)
        ],
        fetchedNewsArticle: state.fetchedNewsArticle
      };
    default:
      return state;
  }
}

import {
  DATA_FETCHING,
  DATA_FETCHED,
  DATA_NEWS_FETCHING,
  DATA_NEWS_FETCHED,
  DATA_MEMBER_FETCHED,
  DATA_MEMBER_FETCHING,
  DATA_EVENT_FETCHED,
  DATA_EVENT_FETCHING,
  DATA_CIRCLE_FETCHED,
  DATA_CIRCLE_FETCHING
} from '../types/loadingTypes';

const initialState = {
  isLoading: false,
  newsLoading: false,
  memberLoading: false,
  eventLoading: false,
  circleLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DATA_FETCHED:
      return {
        ...state,
        isLoading: false
      };
    case DATA_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DATA_NEWS_FETCHING: {
      return {
        ...state,
        isLoading: true,
        newsLoading: true
      };
    }
    case DATA_NEWS_FETCHED:
      return {
        ...state,
        isLoading: false,
        newsLoading: false
      };
    case DATA_MEMBER_FETCHING: {
      return {
        ...state,
        isLoading: true,
        memberLoading: true
      };
    }
    case DATA_MEMBER_FETCHED:
      return {
        ...state,
        isLoading: false,
        memberLoading: false
      };
    case DATA_EVENT_FETCHING: {
      return {
        ...state,
        isLoading: true,
        eventLoading: true
      };
    }
    case DATA_EVENT_FETCHED:
      return {
        ...state,
        isLoading: false,
        eventLoading: false
      };
    case DATA_CIRCLE_FETCHING: {
      return {
        ...state,
        isLoading: true,
        cricleLoading: true
      };
    }
    case DATA_CIRCLE_FETCHED:
      return {
        ...state,
        isLoading: false,
        circleLoading: false
      };
    default:
      return state;
  }
}

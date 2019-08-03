import {
  GET_NEWS_FAILED,
  GET_NEWS_REQUESTED,
  GET_NEWS_SUCCEEDED,
  SET_NEWS
} from "../Actions/News";

const initialState = {
  fetchingNews: false,
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NEWS_REQUESTED:
      return {
        fetchingNews: true,
        error: null,
        items: []
      }
    case GET_NEWS_SUCCEEDED:
      return {
        fetchingNews: false,
        items: action.items,
        error: null
      }
    case GET_NEWS_FAILED:
      return {
        fetchingNews: false,
        error: action.error
      }
    case SET_NEWS:
      return {
        items: action.news
      }
    default:
      return state;
  }
}

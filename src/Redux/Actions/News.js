export const GET_NEWS_REQUESTED = "GET_NEWS_REQUESTED";
export const GET_NEWS_SUCCEEDED = "GET_NEWS_SUCCEEDED";
export const GET_NEWS_FAILED = "GET_NEWS_FAILED";
export const SET_NEWS = "SET_NEWS";

export function getNews() {
  return {
    type: GET_NEWS_REQUESTED
  };
}

export function setNews(news) {
  return {
    type: SET_NEWS,
    news
  }
}
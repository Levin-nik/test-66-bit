import { put, takeEvery, call } from 'redux-saga/effects'
import { GET_NEWS_REQUESTED, GET_NEWS_SUCCEEDED, GET_NEWS_FAILED } from "../Actions/News";
import { GET_THEME_REQUESTED, GET_THEME_SUCCEEDED, GET_THEME_FAILED } from '../Actions/Themes';
const url = 'http://frontappapi.dock7.66bit.ru/api';

function* getNews(action) {
  try {
    const data = yield call(() => {
      let urlFetch = `${url}/news/get`
      return fetch(urlFetch)
        .then(res => res.json())
    })
    // Так как приходят просто данные без статуса, стоит просто проверка на error
    if (data === "error")
      yield put({ type: GET_NEWS_FAILED, error: data });
    else
      yield put({
        type: GET_NEWS_SUCCEEDED,
        items: data
      });
  } catch (e) {
    yield put({ type: GET_NEWS_FAILED, error: e.message });
  }
}

function* getTheme(action) {
  try {
    const data = yield call(() => {
      let urlFetch = `${url}/theme/get?name=${action.name}`
      return fetch(urlFetch)
        .then(res => res.json())
    })
    // Так как приходят просто данные без статуса, стоит просто проверка на error
    if (data === "error")
      yield put({ type: GET_THEME_FAILED, error: data });
    else
      yield put({
        type: GET_THEME_SUCCEEDED,
        theme: data
      });
  } catch (e) {
    yield put({ type: GET_THEME_FAILED, error: e.message });
  }
}

function* sagaTasks() {
  yield takeEvery(GET_NEWS_REQUESTED, getNews);
  yield takeEvery(GET_THEME_REQUESTED, getTheme);
}

export default sagaTasks;
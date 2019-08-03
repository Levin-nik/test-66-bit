import {
  GET_THEME_REQUESTED,
  GET_THEME_SUCCEEDED,
  GET_THEME_FAILED,
  SET_THEME
} from "../Actions/Themes";

const initialState = {
  fetchingTheme: false,
  theme: null,
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_THEME_REQUESTED:
      return {
        fetchingTheme: true,
        error: null
      }
    case GET_THEME_SUCCEEDED:
      return {
        theme: action.theme,
        fetchingTheme: false,
        error: null
      }
    case GET_THEME_FAILED:
      return {
        fetchingTheme: false,
        error: action.error
      }
    case SET_THEME:
      return {
        theme: action.theme
      }
    default:
      return state;
  }
}

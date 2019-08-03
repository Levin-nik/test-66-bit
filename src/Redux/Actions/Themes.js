export const GET_THEME_REQUESTED = "GET_THEME_REQUESTED";
export const GET_THEME_SUCCEEDED = "GET_THEME_SUCCEEDED";
export const GET_THEME_FAILED = "GET_THEME_FAILED";
export const SET_THEME = "SET_THEME";

export function getTheme(name) {
  return {
    type: GET_THEME_REQUESTED,
    name
  };
}

export function setTheme(theme) {
  return {
    type: SET_THEME,
    theme
  }
}
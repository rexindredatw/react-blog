import moment from "moment-timezone";

const TOKEN_NAME = "token";
const THEME_NAME = "theme";

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const setLocalMode = (mode) => {
  localStorage.setItem(THEME_NAME, mode);
};

export const getLocalMode = () => {
  return localStorage.getItem(THEME_NAME);
};

export const formatTime = (time) => {
  return moment(time).tz("Asia/Taipei").format("YYYY-MM-DD");
};

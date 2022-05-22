import { getAuthToken } from "./utils";
const BASE_URL = "https://student-json-api.lidemy.me";

export const getPost = (id) => {
  return fetch(`${BASE_URL}/posts/${id}?_expand=user`).then((res) =>
    res.json()
  );
};

export const getPosts = () => {
  return fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=desc&_expand=user`
  ).then((res) => res.json());
};

export const getLimitPosts = (page, limit) => {
  return fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=desc&_expand=user&_page=${page}&_limit=${limit}`
  );
};

export const getAuthorPosts = (userId) => {
  return fetch(
    `${BASE_URL}/posts?userId=${userId}&_sort=createdAt&_order=desc&_expand=user`
  ).then((res) => res.json());
};

export const deletePost = (id) => {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const addPost = (title, body) => {
  const token = getAuthToken();

  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};

export const updatePost = (id, title, content) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body: content,
    }),
  }).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const register = (nickname, username, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

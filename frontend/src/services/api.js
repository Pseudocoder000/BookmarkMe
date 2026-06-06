import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  signup: (email, password, passwordConfirm) =>
    apiClient.post('/auth/signup', { email, password, passwordConfirm }),
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password })
};

export const bookmarkService = {
  getBookmarks: () => apiClient.get('/bookmarks'),
  createBookmark: (title, url, isPublic) =>
    apiClient.post('/bookmarks', { title, url, isPublic }),
  updateBookmark: (id, title, url, isPublic) =>
    apiClient.put(`/bookmarks/${id}`, { title, url, isPublic }),
  deleteBookmark: (id) => apiClient.delete(`/bookmarks/${id}`)
};

export const profileService = {
  getPublicProfile: (handle) => apiClient.get(`/profile/${handle}`),
  claimHandle: (handle) => apiClient.post('/profile/claim/handle', { handle })
};

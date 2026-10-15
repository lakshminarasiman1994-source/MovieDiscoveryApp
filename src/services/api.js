import axios from 'axios';
import TMDB_ACCESS_TOKEN from '../config/env';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
});

export default api;

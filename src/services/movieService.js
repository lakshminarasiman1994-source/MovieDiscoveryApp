import api from './api';

export const getPopularMovies = async () => {
  const response = await api.get('/movie/popular');
  return response.data.results;
};

export const getTrendingMovies = async () => {
  const response = await api.get('/trending/movie/day');
  return response.data.results;
};

export const getTopratedMovies = async () => {
  const response = await api.get('/movie/top_rated');
  return response.data.results;
};

export const getNowplayingMovies = async () => {
  const response = await api.get('/movie/now_playing');
  return response.data.results;
};

export const getUpcomingMovies = async () => {
  const response = await api.get('/movie/upcoming');
  return response.data.results;
};


export const searchMovies = async (query) => {
  const response = await api.get('/search/movie', {
    params: {
      query: query,
      language: 'en-US',
      page: 1,
    },
  });

  return response.data.results;
};


export const getMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};


export const getMovieCredits = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data;
};


export const getMovieVideos = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/videos`);
  return response.data.results || [];
};


export const getSimilarMovies = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/similar`);
  return response.data.results || [];
};


export const getMovieRecommendations = async (movieId) => {
  const response = await api.get(
    `/movie/${movieId}/recommendations`,
  );

  return response.data.results || [];
};

export const getMovieGenres = async () => {
  const response = await api.get('/genre/movie/list');
  return response.data.genres || [];
};


export const discoverMoviesByGenre = async (genreId) => {
  const response = await api.get('/discover/movie', {
    params: {
      with_genres: genreId,
      sort_by: 'popularity.desc',
      page: 1,
    },
  });

  return response.data.results || [];
};


export const getPopularTVShows = async () => {
  const response = await api.get('/tv/popular', {
    params: {
      page: 1,
      language: 'en-US',
    },
  });

  return response.data.results || [];
};


export const searchTVShows = async (query) => {
  const response = await api.get('/search/tv', {
    params: {
      query,
      page: 1,
      language: 'en-US',
    },
  });

  return response.data.results || [];
};

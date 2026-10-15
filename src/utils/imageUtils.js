const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export const getPosterUrl = (posterPath, size = 'w500') => {
  if (!posterPath) {
    return null;
  }

  return `${IMAGE_BASE_URL}${size}${posterPath}`;
};

export const getBackdropUrl = (backdropPath, size = 'w780') => {
  if (!backdropPath) {
    return null;
  }

  return `${IMAGE_BASE_URL}${size}${backdropPath}`;
};

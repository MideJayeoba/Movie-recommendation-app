import axios from 'axios';

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Create axios instance for TMDB
const tmdbAPI = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY
  }
});

// TMDB API calls
export const searchMovies = async (query, page = 1) => {
  const response = await tmdbAPI.get('/search/movie', {
    params: { query, page }
  });
  return response.data;
};

export const getPopularMovies = async (page = 1) => {
  const response = await tmdbAPI.get('/movie/popular', {
    params: { page }
  });
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await tmdbAPI.get(`/movie/${movieId}`);
  return response.data;
};

// Helper function to get image URL
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export default tmdbAPI;

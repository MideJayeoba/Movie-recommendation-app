import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  TextField,
  Grid,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { searchMovies, getPopularMovies } from '../services/tmdb';
import { favoritesAPI } from '../services/api';
import MovieCard from '../components/MovieCard';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPopularMovies();
    loadFavorites();
  }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const data = await getPopularMovies();
      setMovies(data.results);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const response = await favoritesAPI.getFavorites();
      setFavorites(response.data.map(fav => fav.movieId));
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadPopularMovies();
      return;
    }

    setLoading(true);
    try {
      const data = await searchMovies(searchQuery);
      setMovies(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (movieId) => {
    if (favorites.includes(movieId)) {
      setFavorites(favorites.filter(id => id !== movieId));
    } else {
      setFavorites([...favorites, movieId]);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Discover Movies
      </Typography>
      
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard
                movie={movie}
                isFavorite={favorites.includes(movie.id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && movies.length === 0 && (
        <Box textAlign="center" my={4}>
          <Typography variant="h6" color="text.secondary">
            No movies found
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Movies;

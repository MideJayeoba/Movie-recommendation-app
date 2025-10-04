import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Grid,
  Typography,
  CircularProgress
} from '@mui/material';
import { favoritesAPI } from '../services/api';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const response = await favoritesAPI.getFavorites();
      // Convert favorites to movie format
      const favoritesData = response.data.map(fav => ({
        id: fav.movieId,
        title: fav.title,
        poster_path: fav.posterPath,
        overview: fav.overview,
        release_date: fav.releaseDate,
        vote_average: fav.voteAverage
      }));
      setFavorites(favoritesData);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    loadFavorites();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Favorites
      </Typography>

      {favorites.length === 0 ? (
        <Box textAlign="center" my={4}>
          <Typography variant="h6" color="text.secondary">
            No favorites yet. Start adding movies to your favorites!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard
                movie={movie}
                isFavorite={true}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;

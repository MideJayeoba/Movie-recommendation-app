import React, { useState, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getImageUrl } from '../services/tmdb';
import { favoritesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const MovieCard = ({ movie, isFavorite: initialIsFavorite, onFavoriteToggle }) => {
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      alert('Please login to add favorites');
      return;
    }

    setLoading(true);
    try {
      if (isFavorite) {
        await favoritesAPI.removeFavorite(movie.id);
        setIsFavorite(false);
      } else {
        await favoritesAPI.addFavorite({
          movieId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          overview: movie.overview,
          releaseDate: movie.release_date,
          voteAverage: movie.vote_average
        });
        setIsFavorite(true);
      }
      if (onFavoriteToggle) {
        onFavoriteToggle(movie.id);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert(error.response?.data?.message || 'Failed to update favorites');
    } finally {
      setLoading(false);
    }
  };

  const imageUrl = getImageUrl(movie.poster_path) || 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="400"
        image={imageUrl}
        alt={movie.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
          <IconButton
            onClick={handleFavoriteToggle}
            disabled={loading}
            color="error"
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default MovieCard;

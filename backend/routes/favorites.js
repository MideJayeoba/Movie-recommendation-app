const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/favorites
// @desc    Get user's favorite movies
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('favorites');
    res.json(user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/favorites
// @desc    Add movie to favorites
// @access  Private
router.post('/', protect, async (req, res) => {
  const { movieId, title, posterPath, overview, releaseDate, voteAverage } = req.body;

  try {
    const user = await User.findById(req.user._id);

    // Check if movie already in favorites
    const alreadyFavorite = user.favorites.find(
      fav => fav.movieId === movieId
    );

    if (alreadyFavorite) {
      return res.status(400).json({ message: 'Movie already in favorites' });
    }

    // Add to favorites
    user.favorites.push({
      movieId,
      title,
      posterPath,
      overview,
      releaseDate,
      voteAverage
    });

    await user.save();

    res.status(201).json(user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/favorites/:movieId
// @desc    Remove movie from favorites
// @access  Private
router.delete('/:movieId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Remove from favorites
    user.favorites = user.favorites.filter(
      fav => fav.movieId !== parseInt(req.params.movieId)
    );

    await user.save();

    res.json(user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const ReviewModel = require('../models/movie.model'); 
const MovieModel = require('../models/movie.model'); 

const addReview = async (req, res) => {
  const { movieId, reviewerName, rating, comment } = req.body; 

  if (!movieId || rating === undefined || !comment) {
    return res.status(400).json({ message: 'Movie ID, rating, and comment are required.' });
  }

  if (rating < 0 || rating > 10) {
    return res.status(400).json({ message: 'Rating must be between 0 and 10.' });
  }

  try {
    const movie = await MovieModel.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found.' });
    }

    const newReview = new ReviewModel({
      movieId,
      reviewerName,
      rating,
      comment,
    });
    await newReview.save();

    const reviews = await ReviewModel.find({ movieId }); 
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    movie.averageRating = totalRating / reviews.length; 

    await movie.save();

    res.status(201).json(newReview); 
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  addReview,
};

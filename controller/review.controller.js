const MovieModel = require('../models/movie.model');

const getMovieWithReviews = async (req, res) => {
    const { id } = req.query;
    console.log("id -> ", id)
    try {
        const movie = await MovieModel.findById(id).lean();
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ movie, reviews: movie.reviews });
    } catch (error) {
        console.error('Error fetching movie and reviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addReview = async (req, res) => {
    const { movieId, author, rating, comment } = req.body;

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

        // Add the new review to the movie's reviews array
        const newReview = {
            reviewerName: author,
            rating,
            comment,
            reviewDate: new Date()
        };

        movie.reviews.push(newReview);

        // Recalculate the average rating
        const totalRating = movie.reviews.reduce((acc, review) => acc + review.rating, 0);
        movie.averageRating = totalRating / movie.reviews.length;

        await movie.save();

        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateReview = async (req, res) => {

    try {
        const movie = await MovieModel.findById(movieId);

        if (!movie) {
            throw new Error('Movie not found');
        }

        if (reviewIndex < 0 || reviewIndex >= movie.reviews.length) {
            throw new Error('Invalid review index');
        }

        movie.reviews[reviewIndex].rating = updatedReview.rating;
        movie.reviews[reviewIndex].comment = updatedReview.comment;

        await movie.save();

        return { success: true, message: 'Review updated successfully' };
    } catch (error) {
        console.error('Error updating review:', error);
        return { success: false, message: error.message };
    }
};

const deleteReview = async (req, res) => {
    const { movieId, reviewIndex } = req.params;

    try {
        const movie = await MovieModel.findById(movieId);
        
        if (!movie) {
          return res.status(404).json({ success: false, message: 'Movie not found' });
        }
    
        const index = parseInt(reviewIndex, 10);
        if (index < 0 || index >= movie.reviews.length) {
          return res.status(400).json({ success: false, message: 'Invalid review index' });
        }
    
        movie.reviews.splice(index, 1);
    
        await movie.save();
    
        res.status(200).json({ success: true, message: 'Review deleted successfully' });
      } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ success: false, message: 'Failed to delete review' });
      }
}

    module.exports = {
        addReview,
        getMovieWithReviews,
        updateReview,
        deleteReview,
    };

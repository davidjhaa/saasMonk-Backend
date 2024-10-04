const MovieModel = require('../models/movie.model');
const ReviewModel = require('../models/review.model');

const getAllMovies = async (req, res) => {
    try {
        const movies = await MovieModel.find().lean();
        res.status(200).json(movies);
    }
    catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getMovieWithReviews = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await MovieModel.findById(id).lean();
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const reviews = await ReviewModel.find({ movieId: id }).lean();
        res.status(200).json({ movie, reviews });
    } catch (error) {
        console.error('Error fetching movie and reviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const searchMoviesByName = async (req, res) => {
    const { query } = req.query; 
    try {
        const movies = await MovieModel.find({
            movieName: { $regex: query, $options: 'i' }, 
        }).lean();

        res.status(200).json(movies); 
    } catch (error) {
        console.error('Error searching for movies:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllMovies,
    getMovieWithReviews,
    searchMoviesByName, 
};

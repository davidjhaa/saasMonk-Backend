const MovieModel = require('../models/movie.model');

const addMovie = async (req, res) => {
    const { movieName, releaseDate, averageRating } = req.body; 

    if (!movieName || !releaseDate) {
        return res.status(400).json({ message: 'Movie name and release date are required.' });
    }

    try {
        const newMovie = new MovieModel({
            movieName,
            releaseDate,
            averageRating: averageRating || null, 
        });
        await newMovie.save();

        res.status(201).json(newMovie); 
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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

const updateMovie = async (req, res) => {
    const { id } = req.params;
    const { movieName, releaseDate, averageRating } = req.body;

    try {
        const updatedMovie = await MovieModel.findByIdAndUpdate(
            id,
            { movieName, releaseDate, averageRating },
            { new: true } 
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found.' });
        }

        res.status(200).json(updatedMovie);
    }
    catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteMovie = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        await MovieModel.deleteMany({ movieId: id });

        const deletedMovie = await MovieModel.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found.' });
        }

        res.status(204).send(); 
    }
    catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    addMovie,
    getAllMovies,
    searchMoviesByName,
    updateMovie,
    deleteMovie,
};

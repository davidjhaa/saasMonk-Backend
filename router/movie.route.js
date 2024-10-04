const express = require('express');
const { addMovie, getAllMovies, searchMoviesByName , updateMovie, deleteMovie} = require('../controller/movie.controller'); 

const movieRouter = express.Router();

movieRouter.post('/', addMovie);
movieRouter.get('/', getAllMovies);
movieRouter.put('/:id', updateMovie);
movieRouter.delete('/:id', deleteMovie);
movieRouter.get('/search', searchMoviesByName);



module.exports = movieRouter;

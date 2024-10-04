const express = require('express');
const { getAllMovies, getMovieWithReviews, searchMoviesByName } = require('../controller/movie.controller'); 

const router = express.Router();

router.get('/', getAllMovies);

router.get('/:id', getMovieWithReviews);

router.get('/search', searchMoviesByName);


module.exports = router;

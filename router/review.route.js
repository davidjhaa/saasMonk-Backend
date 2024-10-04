const express = require('express');
const { addReview, getMovieWithReviews , deleteReview} = require('../controller/review.controller'); 

const reviewRouter = express.Router();

reviewRouter.get('/', getMovieWithReviews)
reviewRouter.post('/', addReview);
reviewRouter.delete(':movieId/review/:reviewIndex', deleteReview)



module.exports = reviewRouter;

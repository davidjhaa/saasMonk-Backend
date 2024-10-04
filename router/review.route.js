const express = require('express');
const { addReview } = require('../controller/review.controller'); 

const router = express.Router();

router.post('/', addReview);

module.exports = router;

const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
    trim: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  averageRating: {
    type: Number,
    min: 0,
    max: 10,
    default: null, 
  },
});


const MovieModel = mongoose.model('Movie', MovieSchema);
module.exports = MovieModel;

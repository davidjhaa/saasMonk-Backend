const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const movieRouter = require('./router/movie.route');
const reviewRouter = require('./router/review.route');
const MovieModel = require('./models/movie.model')

require('dotenv').config()

const db_link = process.env.MONGODB_URI;

const app = express();

app.use(cors()) ;
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("Express on Vercel"));
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/review', reviewRouter);



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

mongoose
    .connect(db_link)
    .then(function (db) {
    console.log("MongoDB connected successfully");
    })
    .catch(function (err) {
        console.log("Error connecting to MongoDB:", err);
});

// const dummyMovies = [
//     {
//       movieName: "The Time Traveler",
//       releaseDate: new Date('2021-07-12'),
//     },
//     {
//       movieName: "Galactic Odyssey",
//       releaseDate: new Date('2022-03-22'),
//     },
//     {
//       movieName: "Whispers of the Night",
//       releaseDate: new Date('2020-11-05'),
//     },
//     {
//       movieName: "Parallel Dimensions",
//       releaseDate: new Date('2019-08-17'),
//     },
//     {
//       movieName: "Echoes of Tomorrow",
//       releaseDate: new Date('2023-06-10'),
//     },
//     {
//       movieName: "The Last Horizon",
//       releaseDate: new Date('2021-01-15'),
//     },
//     {
//       movieName: "Shadows of Eternity",
//       releaseDate: new Date('2022-10-30'),
//     },
//     {
//       movieName: "The Quantum Quest",
//       releaseDate: new Date('2020-05-08'),
//     },
//     {
//       movieName: "Mystic Realms",
//       releaseDate: new Date('2018-04-22'),
//     },
//     {
//       movieName: "Forgotten Legends",
//       releaseDate: new Date('2023-09-13'),
//     }
//   ];
  
  // Adding these movies to the database
//   dummyMovies.forEach(async (movieData) => {
//     try {
//       const newMovie = new MovieModel({
//         movieName: movieData.movieName,
//         releaseDate: movieData.releaseDate,
//         averageRating: null,
//         reviews: []
//       });
//       await newMovie.save();
//       console.log(`Added movie: ${movieData.movieName}`);
//     } catch (error) {
//       console.error(`Error adding movie: ${movieData.movieName}`, error);
//     }
//   });
  


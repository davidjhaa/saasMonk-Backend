const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const MovieModel = require('./models/movie.model'); 
const ReviewModel = require('./models/review.model');
const movieRoutes = require('./router/movie.route');
const reviewRoutes = require('./router/review.route')

require('dotenv').config()

const db_link = process.env.MONGODB_URI;

const app = express();

app.use(cors()) ;
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("Express on Vercel"));
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/review', reviewRoutes);



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
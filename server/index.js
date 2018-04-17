const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require ('path');
const db = require(path.join(__dirname + '/../database/index.js'));
const token = require('./../config');

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());

// Helper function to get genres from Spotify's API
const getGenres = require('./helpers').getGenres

// GET request to get all genres in Spotify
app.get('/genres', (req, res) => {
  // Call a helper function that will send the actual GET request to Spotify's API for the genres
  getGenres( (err, data, body) => {
    let genres = body;
    console.log('got genres to server: ', genres);
    res.send(genres);
  })
})



let port = 3000

app.listen(port, () => {
  console.log('Listetning on port: ', port);
})


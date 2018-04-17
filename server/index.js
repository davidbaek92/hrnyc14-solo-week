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

// Helper function to get songs from Spotify's API
const getSongs = require('./helpers').getSongs

// GET request to get all genres in Spotify
app.get('/genres', (req, res) => {
  // Call a helper function that will send the actual GET request to Spotify's API for the genres
  getGenres( (err, data, body) => {
    if (err) {
      console.log('Error in GET/genres: ', genres);
    }
    let genres = body;    
    res.send(genres);
  })
})

// GET request to get songs that match the genre that was typed in
app.get('/songs', (req, res) => {
  let genre = req.query
  console.log('server | getting songs with this genre: ', genre);
  getSongs(genre)
  res.send('Got songs')
})

let port = 3000

app.listen(port, () => {
  console.log('Listetning on port: ', port);
})


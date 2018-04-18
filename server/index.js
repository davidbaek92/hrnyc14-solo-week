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

// Helper function to save songs in database
const saveSongs = require('./../database/index.js').saveSongs

// Helper function to get saved songs in database
const getFavorites = require('./../database/index.js').getFavorites

// GET request to get all genres in Spotify
app.get('/genres', (req, res) => {
  // Call a helper function that will send the actual GET request to Spotify's API for the genres
  getGenres( (err, data, body) => {
    if (err) {
      console.log('Error in GET/genres: ', err);
      res.status(404).send(err);
    } else {      
      res.status(200).send(body);
    }
  })
})

// GET request to get songs that match the genre that was typed in
app.get('/songs', (req, res) => {
  let genre = req.query
  console.log('server | getting songs with this genre: ', genre);
  getSongs(genre, (err, data, body) => {
    if (err) {
      console.log('Error in GET/songs: ', err)
      res.status(404).send(err);
    } else {      
      console.log('Spotify returned these songs: ', body)
      res.status(200).send(body);
    }
  })
})

app.post('/save', (req, res) => {
  let song = req.body;
  console.log('inside server. saving this song: ', song)
  saveSongs(song)
    .then( (response) => {      
      console.log('inside server. back from database with this song saved: ', response)
      res.status(201).send(response);
    })
})

// GET request to get favorite songs saved in the database
app.get('/save', (req, res) => {
  getFavorites()
    .then( (response) => {
      console.log('inside server. back from database with favorites: ', response)
      res.status(201).send(response);
    })
    .catch( (err) => {
      res.status(404).send(err);
    })
})

let port = 3000

app.listen(port, () => {
  console.log('Listetning on port: ', port);
})


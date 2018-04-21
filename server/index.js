const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require ('path');
const db = require(path.join(__dirname + '/../database/index.js'));

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());

// Helper function to get genres from Spotify's API
const getGenres = require('./helpers').getGenres

// Helper function to get songs from Spotify's API
const getSongs = require('./helpers').getSongs

// Helper function to get categories from Spotify API
const getCategories = require('./helpers').getCategories

// Helper function to get top tracks by an artist
const getTopTracks = require('./helpers').getTopTracks

// Helper function to save songs in database
const saveSongs = require('./../database/index.js').saveSongs

// Helper function to remove song in database
const deleteFavorite = require('./../database/index.js').deleteFavorite

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

// GET request to get all categories in Spotify
app.get('/categories', (req, res) => {
  getCategories( (err, data, body) => {        
    if (err) {      
      res.status(404).send(err)
    } else {
      res.status(200).send(body);
    }
  });
})

// GET request to get songs that match the genre that was typed in
app.get('/songs', (req, res) => {
  let genre = req.query    
  getSongs(genre, (err, data, body) => {    
    if (err) {
      console.log('Error in GET/songs: ', err)
      res.status(404).send(err);
    } else {            
      res.status(200).send(body);
    }
  })
})

// POST request to save song
app.post('/save', (req, res) => {
  let song = req.body;  
  saveSongs(song)
    .then( (response) => {            
      res.status(201).send(response);
    })
})

// GET request to get favorite songs saved in the database
app.get('/save', (req, res) => {
  getFavorites()
    .then( (response) => {      
      res.status(201).send(response);
    })
    .catch( (err) => {
      res.status(404).send(err);
    })
})

// POST request to remove song from the database
app.post('/delete', (req, res) => {
  let deleted = req.body
  console.log('inside server. deleting this song: ', deleted);
  deleteFavorite(deleted)
    .then( (response) => {
      res.status(201).send(response);
    })
    .catch( (err) => {
      res.status(404).send(err);
    })
})

// GET request to get top tracks for specific artist
app.get('/artist', (req, res) => {
  let artistId = req.query.artistId;  
  getTopTracks(artistId, (err, data, body) => {    
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(body);
    }   
  })
})


let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listetning on port: ', port);
})


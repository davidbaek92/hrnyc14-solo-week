// Create helper funcions that will be called by the server
const axios = require('axios');
const request = require('request');
const clientId = require('./../config').clientId;
const clientSecret = require('./../config').clientSecret;
const token = require('./../config').TOKEN;

// const spotify = require('machinepack-spotify')
// const refresh = require('spotify-refresh');

// Get a new Spotify access token when the old one expires
// refresh(token, clientId, clientSecret, (err, res, body) => {
//   if (err) {console.log('ERROR in refreshing Spotify access token!', err)}
//   else {
//     let response = body;
//     console.log('response: ', response)
//   }
// })

// POST request to get refreshed access token from Spotify

// Create a fuction that will make a GET request to Spotify and return the genres
const getGenres = (cb) => {
  let options = {    
    method: 'GET',
    url: 'https://api.spotify.com/v1/recommendations/available-genre-seeds',
    headers: {
      Authorization: token
    }
  } 

  request(options, (err, data, body) => {
    if (err) {console.log('ERROR IN API REQUEST: ', err)}
    else {      
      console.log('body: ', body);      
      cb(err, data, body);
    }
  })

}




// After MVP, save the genres in a database for quicker calling upon page rendering?
exports.getGenres = getGenres;
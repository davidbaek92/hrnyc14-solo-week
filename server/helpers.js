const axios = require('axios');
const request = require('request');
// const clientId = require('./../config').clientId;
// const clientSecret = require('./../config').clientSecret;

let clientId
try {
  clientId = require('./../config').clientId;
} catch(err) {
  clientId = process.env.CLIENT_ID
}

let clientSecret
try {
  clientSecret = require('./../config').clientSecret;
} catch(err) {
  clientSecret = process.env.CLIENT_SECRET
}

// ====================================
// IMPORTANT
// ====================================
// Use the clientId and clientSecret to access a token
// Pass in that token, instead of generating the token and updating config file
// ====================================

// Create a fuction that will make a GET request to Spotify and return the genres
const getGenres = (cb) => {
  
  // Set up authorization options
  let authOptions = {        
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      },
    form: {
        grant_type: 'client_credentials'
      },
      json: true
    };

  // Send a post request to get an access token using clientId and clientSecret      
  request.post(authOptions, (err, data, body) => {    
    let token = body.access_token; 

    let options = {
      url:  'https://api.spotify.com/v1/recommendations/available-genre-seeds',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }

    request.get(options, (err, data, body) => {         
      cb(err, data, body);
    })    
  })
}

// Makes a GET request to Spotify to return the songs that match the genre that was entered
const getSongs = ({genre}, cb) => {  

  // Set up authorization options
  let authOptions = {        
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      },
    form: {
        grant_type: 'client_credentials'
      },
      json: true
    };
   
  request.post(authOptions, (err, data, body) => {
    let token = body.access_token;
    
    let options = {
      url: `https://api.spotify.com/v1/recommendations?seed_genres=${genre}`,
      headers: {
        Authorization: 'Bearer ' + token
      }
    }

    request.get(options, (err, data, body) => {
      cb(err,data,body);
    })
  })  
}

const getCategories = (cb) => {  
  let authOptions = {        
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      },
    form: {
        grant_type: 'client_credentials'
      },
      json: true
    };

  request.post(authOptions, (err, data, body) => {
    let token = body.access_token;

    let options = {
      url: `https://api.spotify.com/v1/browse/categories`,
      headers: {
        Authorization: 'Bearer ' + token
      }
    }

    request.get(options, (err, data, body) => {      
      cb(err, data, body)
    })
  })
}

const getTopTracks = (artistId, cb) => {
  let authOptions = {        
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      },
    form: {
        grant_type: 'client_credentials'
      },
      json: true
    };

  request.post(authOptions, (err, data, body) => {
    let token = body.access_token;

    let options = {
      url: `https://api.spotify.com/v1/artists/${artistId}`,
      headers: {
        Authorization: 'Bearer ' + token
      }      
    }

    request.get(options, (err, data, body) => {      
      cb(err, data, body)
    })
  })
}

exports.getGenres = getGenres;
exports.getSongs = getSongs;
exports.getCategories = getCategories;
exports.getTopTracks = getTopTracks;

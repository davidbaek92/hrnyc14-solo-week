const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/swp');

// create a schema to hold the songs that the user saves
let favoritesSchema = mongoose.Schema({
  songId: String,
  songTitle: String,
  albumTitle: String,
  artist: String,
  spotifyUrl: String,
  albumArt: String
})

let Favorite = mongoose.model('Favorite', favoritesSchema);

// Add song to the database
const saveSongs = (song) => {
  let saved = {
    songId: song.id,
    songTitle: song.name,
    albumTitle: song.album.name,
    artist: song.artists[0].name,
    spotifyUrl: song.external_urls.spotify,
    albumArt: song.album.images[1].url
  }
  console.log('inside DB. saving song: ', saved);
  return Favorite.create(saved)
    .catch( (err) => {
      console.log('ERROR in saving song to database!: ', err);
    })
}

const getFavorites = () => {
  return Favorite.find({})
    .catch( (err) => {
      console.log('ERROR in getting favorites!: ', err);
    })
}

exports.saveSongs = saveSongs;
exports.getFavorites = getFavorites;

// create a schema to hold the list of genres in a database, so you don't need to call Spotify API every time
// let genreSchema = mongoose.Schema({  
//   genre: String
// })

// let Genre = mongoose.model('Genre', genreSchema);

// let saveGenre = (genres) => {
//   return Genre.create(genres)
//     .catch( (err) => {console.log('ERROR in saving genres to database', err)})
// }

// saveGenre([ { 0: 'acoustic' },
// { 1: 'afrobeat' },
// { 2: 'alt-rock' },
// { 3: 'alternative' },
// { 4: 'ambient' },
// { 5: 'anime' },
// { 6: 'black-metal' },
// { 7: 'bluegrass' },
// { 8: 'blues' },
// { 9: 'bossanova' },
// { 10: 'brazil' },
// { 11: 'breakbeat' },
// { 12: 'british' },
// { 13: 'cantopop' },
// { 14: 'chicago-house' },
// { 15: 'children' },
// { 16: 'chill' },
// { 17: 'classical' },
// { 18: 'club' },
// { 19: 'comedy' },
// { 20: 'country' },
// { 21: 'dance' },
// { 22: 'dancehall' },
// { 23: 'death-metal' },
// { 24: 'deep-house' },
// { 25: 'detroit-techno' },
// { 26: 'disco' },
// { 27: 'disney' },
// { 28: 'drum-and-bass' },
// { 29: 'dub' },
// { 30: 'dubstep' },
// { 31: 'edm' },
// { 32: 'electro' },
// { 33: 'electronic' },
// { 34: 'emo' },
// { 35: 'folk' },
// { 36: 'forro' },
// { 37: 'french' },
// { 38: 'funk' },
// { 39: 'garage' },
// { 40: 'german' },
// { 41: 'gospel' },
// { 42: 'goth' },
// { 43: 'grindcore' },
// { 44: 'groove' },
// { 45: 'grunge' },
// { 46: 'guitar' },
// { 47: 'happy' },
// { 48: 'hard-rock' },
// { 49: 'hardcore' },
// { 50: 'hardstyle' },
// { 51: 'heavy-metal' },
// { 52: 'hip-hop' },
// { 53: 'holidays' },
// { 54: 'honky-tonk' },
// { 55: 'house' },
// { 56: 'idm' },
// { 57: 'indian' },
// { 58: 'indie' },
// { 59: 'indie-pop' },
// { 60: 'industrial' },
// { 61: 'iranian' },
// { 62: 'j-dance' },
// { 63: 'j-idol' },
// { 64: 'j-pop' },
// { 65: 'j-rock' },
// { 66: 'jazz' },
// { 67: 'k-pop' },
// { 68: 'kids' },
// { 69: 'latin' },
// { 70: 'latino' },
// { 71: 'malay' },
// { 72: 'mandopop' },
// { 73: 'metal' },
// { 74: 'metal-misc' },
// { 75: 'metalcore' },
// { 76: 'minimal-techno' },
// { 77: 'movies' },
// { 78: 'mpb' },
// { 79: 'new-age' },
// { 80: 'new-release' },
// { 81: 'opera' },
// { 82: 'pagode' },
// { 83: 'party' },
// { 84: 'philippines-opm' },
// { 85: 'piano' },
// { 86: 'pop' },
// { 87: 'pop-film' },
// { 88: 'post-dubstep' },
// { 89: 'power-pop' },
// { 90: 'progressive-house' },
// { 91: 'psych-rock' },
// { 92: 'punk' },
// { 93: 'punk-rock' },
// { 94: 'r-n-b' },
// { 95: 'rainy-day' },
// { 96: 'reggae' },
// { 97: 'reggaeton' },
// { 98: 'road-trip' },
// { 99: 'rock' },
// { 100: 'rock-n-roll' },
// { 101: 'rockabilly' },
// { 102: 'romance' },
// { 103: 'sad' },
// { 104: 'salsa' },
// { 105: 'samba' },
// { 106: 'sertanejo' },
// { 107: 'show-tunes' },
// { 108: 'singer-songwriter' },
// { 109: 'ska' },
// { 110: 'sleep' },
// { 111: 'songwriter' },
// { 112: 'soul' },
// { 113: 'soundtracks' },
// { 114: 'spanish' },
// { 115: 'study' },
// { 116: 'summer' },
// { 117: 'swedish' },
// { 118: 'synth-pop' },
// { 119: 'tango' },
// { 120: 'techno' },
// { 121: 'trance' },
// { 122: 'trip-hop' },
// { 123: 'turkish' },
// { 124: 'work-out' },
// { 125: 'world-music' }])
const mongoose = require('mongoose');
mongoose.connect(process.env.MLAB_URL || 'mongodb://localhost/swp');

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

// Get the songs in the favorites database
const getFavorites = () => {
  return Favorite.find({})
    .catch( (err) => {
      console.log('ERROR in getting favorites!: ', err);
    })
}

// Delete a song from the favorites database
const deleteFavorite = (song) => {
  let deleted = song;
  console.log('in database. deleting: ', deleted);
  return Favorite.remove({
    songId: deleted.songId
  })
    .catch( (err) => {

    })
}

exports.saveSongs = saveSongs;
exports.getFavorites = getFavorites;
exports.deleteFavorite = deleteFavorite;
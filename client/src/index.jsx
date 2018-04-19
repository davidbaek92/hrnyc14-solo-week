import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Playlist from './components/Playlist.jsx'
import Favorites from './components/Favorites.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genre: '',
      genres: [],
      songs: [],
      favorites: [],
      showingFaves: false
    }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.toggleFavorites = this.toggleFavorites.bind(this);
  this.getFavorites = this.getFavorites.bind(this);
  this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  componentDidMount() {        
  }

  getGenres() {
    axios.get('/genres')
      .then( (response) => {
        let genres = response.data.genres        
        this.setState({
          genres: genres
        })
      })
      .catch( (err) => {
        console.log('Error in getting genres: ', err);
      })
  }

  getFavorites() {
    console.log('getting favorites')
    axios.get('/save')
      .then( (response) => {
        let favorites = response.data;
        console.log('Got favorites: ', favorites);
        this.setState({
          favorites: favorites
        })
      })
      .catch( (err) => {
      })
  }

  deleteFavorite(favorite) {
    console.log('Deleting this favorite: ', favorite);
    axios.post('/delete', favorite)
      .then( (response) => {
        let deleted = response;
        console.log('Deleted: ', deleted);
        // get the new favorites
        // update state
      })
      .catch()
  }

  // Set the genre to be searched
  handleChange(event) {    
    let genre = event.target.value;
    this.setState({
      genre: genre
    })
  }

  // Get the songs that match the genre that was searched
  handleSubmit(event) {
    event.preventDefault();
    axios.get('/songs', {
      params: {
        genre: this.state.genre
      }
    })
      .then( (response) => {
        let songs = response.data.tracks;
        console.log('got songs: ', songs)
        this.setState({
          songs: songs
        })
      })
      .catch()
  }

  toggleFavorites(event) {
    this.setState({
      showingFaves: !this.state.showingFaves
    }, () => {
      console.log('showing faves: ', this.state.showingFaves);
      if (this.state.showingFaves) {
        this.getFavorites();
      }
    })
  }
  
  render() {
    return (
      <div>
        <button onClick={this.toggleFavorites}>{this.state.showingFaves === false ? 'Show Favorites' : 'Show Songs'}</button>
        <form>
          <input 
          onChange={this.handleChange}
          value={this.state.genre}
          />
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </form>
        {this.state.showingFaves ? <Favorites deleteFavorite={this.deleteFavorite} favorites={this.state.favorites}/> : <Playlist songs={this.state.songs}/>}                 
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


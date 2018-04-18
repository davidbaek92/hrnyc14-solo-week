import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Playlist from './components/Playlist.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genre: 'pop',
      genres: [],
      songs: [],
      favorites: [],
      showingFaves: false
    }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {    
    this.handleSubmit();
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

  // Set the genre to be searched
  handleChange(event) {    
    let genre = event.target.value;
    this.setState({
      genre: genre
    })
  }

  // Get the songs that match the genre that was searched
  handleSubmit() {
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
  
  render() {
    return (
      <div>
        <button>{this.state.showingFaves === false ? 'Show Songs' : 'Show Favorites'}</button>
        <form>
          <input 
          onChange={this.handleChange}
          value={this.state.genre}
          />
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </form>
        <Playlist songs={this.state.songs}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


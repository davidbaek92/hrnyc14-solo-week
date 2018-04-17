import React from 'react';
import axios from 'axios';

import Playlist from './Playlist.jsx'

class Search extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      genre: 'pop',
      songs: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // return an initial list of songs when page loads
  componentDidMount() {
    axios.get('/songs', {
      params: {
        genre: this.state.genre
      }
    })
      .then( (response) => {
        let songs = response.data.tracks;
        this.setState({
          songs: songs
        })
      })
  }

  handleChange(event) {
    let genre = event.target.value;    
    this.setState({
      genre: genre
    })
  }

  // handleSubmit will call a get request to GET /songs
  handleSubmit(event) {
    event.preventDefault();
    let genre = this.state.genre
    console.log('Submit was clicked! Searching for songs in this genre: ', genre);
    axios.get('/songs', {
      params: {
        genre: genre
      }
    })
      .then( (response) => {
        let songs = response.data.tracks
        console.log('Got songs!: ', songs)
        this.setState({
          songs: songs
        })
      })
  }

  render() {
    return (
      <div>
        <form>
          <input 
          onChange={this.handleChange}
          value={this.state.genre}
          />
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </form>
        <Playlist songs={this.state.songs} />

      </div>

    )
  }
}

export default Search;
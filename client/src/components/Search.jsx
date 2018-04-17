import React from 'react';
import axios from 'axios';

class Search extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      genre: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log('Got songs!: ', response)
      })
  }

  render() {
    return (
      <form>
        <input 
        onChange={this.handleChange}
        value={this.state.genre}
        />
        <input type="submit" value="Submit" onClick={this.handleSubmit}/>
      </form>

    )
  }
}

export default Search;
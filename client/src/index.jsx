import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Search from './components/Search.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      // if showingFaves === false, clicking 'Show Favorites' will render the favorite songs from the database
      showingFaves: false
    }    
  this.toggleShowFaves = this.toggleShowFaves.bind(this);
  }

  // Send an intial GET request to return the genres from Spotify
  componentDidMount() {
    this.getGenres();
  }

  // GET request to return the genres from Spotify
  getGenres() {
    axios.get('/genres')
      .then( (results) => {
        let genres = results.data.genres
        console.log('IF UNDEFINED, REFRESH TOKEN!! | got genres to front end: ', genres)
        this.setState({
          genres: genres
        })
      })
      .catch( (err) => {
        if (err) {console.log('error in getting genres to client: ', err)}
      }) 
  }

  toggleShowFaves() {
    this.setState({
      showingFaves: !this.state.showingFaves
    }, () => {
      console.log('Showing favorites: ', this.state.showingFaves);
    })
  }

  render() {    
    return (
      <div>
        <button type="button" onClick={this.toggleShowFaves}>Show Favorites</button>        
        <Search showingFaves={this.state.showingFaves}/>        
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


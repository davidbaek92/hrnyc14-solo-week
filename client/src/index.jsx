// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// Material UI
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Paper from 'material-ui/Paper';
import {blue900, orange700, orange500, blue500} from 'material-ui/styles/colors';


// Components
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
      category: '',
      categories: [],
      showingFaves: false,
      view: 'login'
    }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.toggleFavorites = this.toggleFavorites.bind(this);
  this.getFavorites = this.getFavorites.bind(this);
  this.deleteFavorite = this.deleteFavorite.bind(this);
  this.handleGenreAutoCompleteSelection = this.handleGenreAutoCompleteSelection.bind(this);
  }

  componentDidMount() {     
    this.getGenres();  
    this.getCategories(); 
  }

  changeView(view) {
    this.setState({
      view: view
    });
  }

  renderView() {
    const {view} = this.state;
    
    if (view === 'login') {
      return <Login />
    } else if (view === 'app') {
      return <App />
    }

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

  getCategories() {    
    axios.get('/categories')
      .then( (response) => {
        let categories = response.data.categories.items;        
        let categoryNames = categories.map( (category) => {
          return category.name;
        })        
        this.setState({
          categories: categoryNames
        })
      })
      .catch( (err) => {
        console.log('Error in getting categories: ', err);
      })
  }

  deleteFavorite(favorite) {    
    axios.post('/delete', favorite)
      .then( (response) => {
        let deleted = response;
        console.log('Deleted: ', deleted);
        // get the new favorites
        this.getFavorites();        
      })
      .catch()
  }

  // Set the genre to be searched
  handleChange(genre) {    
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

  // Get the songs when a genre is selected from the AutoComplete list
  handleGenreAutoCompleteSelection() {
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

  handleCategoryAutoCompleteSelection() {
    
  }

  toggleFavorites(event) {
    this.setState({
      showingFaves: !this.state.showingFaves
    }, () => {      
      if (this.state.showingFaves) {
        this.getFavorites();
      }
    })
  }
  
  render() {
    return (      
      <MuiThemeProvider>
        <div id="main">
          <button className="navButton" onClick={this.toggleFavorites}>{this.state.showingFaves === false ? 'Show Favorites' : 'Show Songs'}</button>          
          {this.state.showingFaves 
          ? <p></p>
          : <div>
              <form className="nav">
                <AutoComplete className="search"
                  hintText="start typing and pick a genre from the list!"
                  dataSource={this.state.genres}
                  onUpdateInput={this.handleChange}
                  value={this.state.genre}
                  onNewRequest={this.handleGenreAutoCompleteSelection}
                  underlineFocusStyle={{
                    borderColor: blue900,
                  }}
                />          
                {/* <input className="hide" type="submit" value="Submit" onClick={this.handleSubmit}/> */}
              </form>              
          </div>
          }
            {this.state.showingFaves ? <Favorites className="favoriteComponent" deleteFavorite={this.deleteFavorite} favorites={this.state.favorites}/> : <Playlist songs={this.state.songs}/>}                           
        </div>     
      </MuiThemeProvider> 
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


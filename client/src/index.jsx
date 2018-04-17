import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Search from './components/Search.jsx'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    }    
  }

  componentDidMount() {
    this.getGenres();
  }

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

  render() {    
    return (
      <div>        
        <Search />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


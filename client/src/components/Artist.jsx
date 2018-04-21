import React from 'react';
import axios from 'axios';
import TopTracks from './TopTracks.jsx';

class Artist extends React.Component{
  constructor(props) {    
    super(props)
    this.state = {
      view: ''
    } 
  this.findTopTracks = this.findTopTracks.bind(this);
  }
  
  findTopTracks(event) {    
    let artistId = event.target.value;
    console.log('Finding toptracks for: ', artistId);
    axios.get('/artist', {
      params: {
        artistId: artistId
      }
    })
      .then( (response) => {
        console.log(response);
        this.changeViewToTopTracks(artistId);
        })
      .catch( (err) => {
        if (err) {
          console.log('Error in finding Artist: ', err)
        }
      })

  }

  changeViewToTopTracks(artistId) {
    console.log('called changeView with artistId: ', artistId);
    return (
      <TopTracks artistId={artistId} />
    )
  }

  render() {
    return (
      <button value={this.props.artistId} onClick={this.findTopTracks}>Find Artist</button>
    )
  }
}

export default Artist;
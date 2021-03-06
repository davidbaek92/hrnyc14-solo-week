import React from 'react';
import axios from 'axios';

class Artist extends React.Component{
  constructor(props) {
    console.log('props in Artist componenet: ',props)
    super(props)
    this.state = {

    } 
  this.findArtist = this.findArtist.bind(this);
  }
  
  findArtist(event) {    
    let artistId = event.target.value;
    console.log('Finding Artist for: ', artistId);
    axios.get('/Artist')
      .then( (response) => {
        let artist = response
        console.log('artist: ', artist)
        })
      .catch( (err) => {
        if (err) {
          console.log('Error in finding Artist: ', err)
        }
      })

  }

  render() {
    return (
      <button value={this.props.artistId} onClick={this.findArtist}>Find Artist</button>
    )
  }
}

export default Artist;
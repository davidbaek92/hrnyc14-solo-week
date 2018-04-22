import React from 'react';
import axios from 'axios';
import TopTracks from './TopTracks.jsx';

class Artist extends React.Component{
  constructor(props) {    
    // console.log('props in artist component: ', props)
    super(props)
    this.state = {
      view: '',
      artistUrl: ''
    }   
  this.findArtistPage = this.findArtistPage.bind(this);
  }

  componentDidMount() {
    this.findArtistPage(this.props.artistId)
  }

  findArtistPage(artistId) {    
    console.log('Finding toptracks for: ', artistId);
    axios.get('/artist', {
      params: {
        artistId: artistId
      }
    })
      .then( (response) => {
        let artistUrl = response.data.external_urls.spotify;
        console.log('artistUrl: ', artistUrl);        
        this.setState({
          artistUrl: artistUrl
        })
      })
      .catch( (err) => {
        if (err) {
          console.log('Error in finding Artist: ', err)
        }
      })
  }


  render() {
    return (
      <a className="artistPage" href={this.state.artistUrl} target="_blank">By: {this.props.artist}</a>
    )
  }
}

export default Artist;
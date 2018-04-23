import React from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import Blazy from 'blazy';
import LazyLoad from 'react-lazy-load';


class Playlist extends React.Component {
  constructor(props) {    
    super(props)
    this.state = {      
    }
    this.saveSong = this.saveSong.bind(this);
  }

  componentDidMount() {    
    const bLazy = new Blazy();
  }

  saveSong(song) {    
    console.log('Saving this song: ', song);
    axios.post('/save', song)
      .then( (response) => {
        let song = response.data
        console.log('Song was saved: ', song)
      })
  }  

  render() {
    return (
    <div>      
      <h3 className="songsHeader"></h3>            
        <div className="results">
        {this.props.songs.length === 0 ?
        ''
        : 
          this.props.songs.map( (song) => {          
          return (
            <div key={song.id} className="container">              
              <div className="song-container">
                <div>                        
                  <a href={song.external_urls.spotify} target="_blank">{song.name} </a>                  
                </div>          
              </div>                      
                  <div className="textWithBlurredBg">                    
                    <img                                      
                    src={song.album.images[1].url} 
                    onClick={ () => {this.saveSong(song)}}
                    />                    
                    <h2>click to save</h2>                      
                  </div>
                  <p></p>
            </div>
            )
        })}
          
        </div>
      </div>
    )
  }  
}

export default Playlist;
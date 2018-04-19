import React from 'react';
import axios from 'axios';

class Playlist extends React.Component {
  constructor(props) {    
    super(props)
    this.state = {      
    }
    this.saveSong = this.saveSong.bind(this);
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
      <h3>Songs</h3>
        <div className="results">
          
        {this.props.songs.length === 0 ?
        'Please try a different search'
        :
          this.props.songs.map( (song) => {          
          return (          
              <div key={song.id }>                        
                <a href={song.external_urls.spotify}>{song.name} </a>
                <button type="button" onClick={() => {this.saveSong(song)} }>Save</button>                                                            
                <p>
                  <img src={song.album.images[1].url} />                      
                </p>
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

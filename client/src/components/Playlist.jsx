import React from 'react';

const Playlist = (props) => {
  return (
  <div>
    <h3>Songs</h3>
      {props.songs.map( (song) => {
        return (
          <div key={song.id}>
            <div>
              <a href={song.external_urls.spotify}>{song.name}</a>              
              <p></p>
            </div>            
          </div>
          )
      })}
    </div>
  )
  
}
export default Playlist;

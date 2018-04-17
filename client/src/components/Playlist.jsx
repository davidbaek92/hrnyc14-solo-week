import React from 'react';

const Playlist = (props) => {
  return (
  <div>
    <h3>Songs</h3>
      {props.songs.map( (song) => {
        return (
          <div key={song.id}>
            <p>{song.name}
              <div><i>{song.external_urls.spotify}</i></div>
            </p>            
          </div>
          )
      })}
    </div>
  )
  
}
export default Playlist;

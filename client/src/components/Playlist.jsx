import React from 'react';

const Playlist = (props) => {
  return (
  <div>
    <h3>Songs</h3>
      {props.songs.map( (song) => {
        return (
          <div>
            <div key={song.id}>                        
              <a href={song.external_urls.spotify}>{song.name}</a>
              <p>
                <img src={song.album.images[1].url} />                      
                <button type="button">Save</button>                                                            
              </p>
              <p></p>
            </div>            
          </div>
          )
      })}
    </div>
  )
  
}
export default Playlist;

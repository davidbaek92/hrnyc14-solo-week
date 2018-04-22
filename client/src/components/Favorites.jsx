import React from 'react';
import Artist from './Artist.jsx';

const Favorites = (props) => {
  return(
    <div>
      <h3>Your Saved Music</h3>
      <div className="saved">
        {props.favorites.map( (favorite) => {          
          return(
            <div key={favorite.songId} className="favorites">
              <div className="artistLinks">
                <a className="songLink" href={favorite.spotifyUrl} target="_blank">{favorite.songTitle}</a>                            
                <Artist artist={favorite.artist} artistId={favorite.artistId}/>                 
              </div>
            <p>
              <img
                title="Click to delete" 
                src={favorite.albumArt}
                onClick={ () => {props.deleteFavorite(favorite)}}
              />
            </p>
            </div>
          )          
        })}        
      </div>
    </div>
  )
}   

export default Favorites;
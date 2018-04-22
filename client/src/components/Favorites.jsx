import React from 'react';
import Artist from './Artist.jsx';

const Favorites = (props) => {
  return(
    <div>
      <h3>{props.favorites.length === 0 ? 'search some music and save your favorites here!' : 'here\'s what you\'re jamming to'}</h3>
      <div className="saved">
        {props.favorites.map( (favorite) => {          
          return(
            <div key={favorite.songId} className="favorites">
              <div className="artistLinks">
                <a className="songLink" href={favorite.spotifyUrl} target="_blank">{favorite.songTitle}</a>                            
                <Artist artist={favorite.artist} artistId={favorite.artistId}/>                 
              </div>
            <div className="textWithBlurredBg">
              <img                
                src={favorite.albumArt}
                onClick={ () => {props.deleteFavorite(favorite)}}
              />
              <h2>click to remove</h2>
            </div>
            </div>
          )          
        })}        
      </div>
    </div>
  )
}   

export default Favorites;
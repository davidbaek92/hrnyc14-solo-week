import React from 'react';
import Events from './Events.jsx';

 const Favorites = (props) => {
   return(
     <div>
       <h3>Your Saved Music</h3>
       <div className="saved">
         {props.favorites.map( (favorite) => {          
           return(
             <div key={favorite.songId} className="favorites">
               <div>
                 <a href={favorite.spotifyUrl} target="_blank">{favorite.songTitle}</a>
                 <p className="eventsButton">                   
                   <Events artist={favorite.artist}/>
                 </p>
             </div>
               <p>
                 <img 
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
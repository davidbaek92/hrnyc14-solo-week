import React from 'react';
import Events from './Events.jsx';

 const Favorites = (props) => {
   return(
     <div>
       <h3>Favorites</h3>
       <div className="saved">
         {props.favorites.map( (favorite) => {          
           return(
             <div key={favorite.songId} className="favorites">
               <div>
                 <a href={favorite.spotifyUrl} target="_blank">{favorite.songTitle}</a>
                 <p className="button">
                   <button className="delete" type="button" onClick={ () => {props.deleteFavorite(favorite)} }>Delete</button>
                   <Events artist={favorite.artist}/>
                 </p>
             </div>
               <p>
                 <img src={favorite.albumArt} />
               </p>
             </div>
           )          
         })}        
       </div>
     </div>
   )
 }   

export default Favorites;
import React from 'react';

class Favorites extends React.Component{
  constructor(props) {
    console.log('props in Favorites: ', props)
    super(props)
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <h3>Favorites</h3>
        <div className="favorites">
          {this.props.favorites.map( (favorite) => {          
            return(
              <div className="song-container">
                <div key={favorite.songId}>
                  <a href={favorite.spotifyUrl} target="_blank">{favorite.songTitle}</a>
                  <p className="button">
                    <button className="delete" type="button" onClick={ () => {this.props.deleteFavorite(favorite)} }>Delete</button>
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
}

export default Favorites;
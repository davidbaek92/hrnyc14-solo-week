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
              <div key={favorite.songId}>
                <a href={favorite.spotifyUrl}>{favorite.songTitle}</a>
                <button type="button" onClick={ () => {this.props.deleteFavorite(favorite)} }>Delete</button>
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
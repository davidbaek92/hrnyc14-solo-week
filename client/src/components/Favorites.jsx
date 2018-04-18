import React from 'react';

class Favorites extends React.Component{
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div>Favorites</div>
        {this.props.favorites.map( (favorite) => {
          console.log(favorite);
          return(
            <div key={favorite.songId}>
              <a href={favorite.spotifyUrl}>{favorite.title}</a>
              <p>
                <img src={favorite.albumArt} />
              </p>
            </div>
          )          
        })}        
      </div>
    )
  }
}

export default Favorites;
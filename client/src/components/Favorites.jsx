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
        })}        
      </div>
    )
  }
}

export default Favorites;
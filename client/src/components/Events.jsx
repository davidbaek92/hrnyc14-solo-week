import React from 'react';
import axios from 'axios';

class Events extends React.Component{
  constructor(props) {
    console.log('props in Events componenet: ',props)
    super(props)
    this.state = {

    } 
  this.findEvents = this.findEvents.bind(this);
  }
  
  findEvents(event) {
    let artist = event.target.value;
    console.log('Finding events for: ', artist);
    axios.get('/events')
      .then( (response) => {
        let events = response
        console.log('events: ', events)
        })
      .catch( (err) => {
        if (err) {
          console.log('Error in finding events: ', err)
        }
      })

  }

  render() {
    return (
      <button value={this.props.artist} onClick={this.findEvents}>Find Events</button>
    )
  }
}

export default Events;
import React, { Component } from 'react';
import './roomlist.css';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    };
    this.storeInput = this.storeInput.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat(room)});
    });
  }

  createRoom(event) {
    event.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({newRoomName: ''});
  }

  storeInput(e) {
    const newValue = e.target.value;
    this.setState({newRoomName: newValue});
  }

  render() {
    return(
      <div id='rooms'>
      <h1>Bloc Chat</h1>
        <form onSubmit={this.createRoom}>
          <input type='text' onChange={this.storeInput}/>
          <input type='submit'/>
        </form>

        <ul>
          {this.state.rooms.map((num, index) => <li key={index}>{num.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default RoomList

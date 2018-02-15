import React, { Component } from 'react';
import './roomlist.css';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: '',
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

  handleClass(num) {
    if (num.key === this.props.activeRoomID) {
      return 'roomName activeRoom'
    } else {
      return 'roomName'
    }
  }

  handleClick(num) {
    const selectionID = num.key;
    const selectionName = num.name;
    this.props.handleClickState(selectionID, selectionName);
  }

  render() {
    return(
      <div id='rooms'>
      <h1 id='app-name'>Bloc Chat</h1>
        <form onSubmit={this.createRoom}>
          <input type='text' id='newRoom' onChange={this.storeInput}/>
          <input type='submit'/>
        </form>

        <ul className='rooms'>
          {this.state.rooms.map((num, index) =>
            <li key={index} className={this.handleClass(num)} onClick={() => this.handleClick(num)}>{num.name}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default RoomList

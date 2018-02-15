import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import * as firebase from 'firebase';
import './App.css';


var config = {
    apiKey: "AIzaSyDxq1MwuIQa4uHnYQL89Gg356lTNXvSchI",
    authDomain: "bloc-chat-react-9e1e3.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-9e1e3.firebaseio.com",
    projectId: "bloc-chat-react-9e1e3",
    storageBucket: "bloc-chat-react-9e1e3.appspot.com",
    messagingSenderId: "124197904168"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoomID: '-L5G7HSty09dMskFDpMA',
      activeRoomName: 'Room 1',
      userName: []
    };
    this.handleClickState = this.handleClickState.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  handleClickState(selectionID, selectionName) {
    const newActiveRoomID = selectionID;
    const newActiveRoomName = selectionName;
    this.setState({activeRoomID: newActiveRoomID});
    this.setState({activeRoomName: newActiveRoomName});
  }

  setUser(user) {
    const newUser = user;
    this.setState({userName: newUser});
  }

  render() {
    return (
      <div className="App">
        <RoomList
          firebase={firebase} activeRoomID={this.state.activeRoomID} activeRoomName={this.state.activeRoomName} handleClickState={this.handleClickState}/>
        <MessageList
          firebase={firebase} activeRoomID={this.state.activeRoomID} activeRoomName={this.state.activeRoomName}/>
        <User firebase={firebase} setUser={this.setUser} userState={this.state.userName} />
      </div>
    );
  }
}

export default App;
